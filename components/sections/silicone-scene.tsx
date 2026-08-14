'use client'

import { useEffect, useRef } from 'react'

const vertex = `attribute vec2 aPosition; void main(){gl_Position=vec4(aPosition,0.,1.);}`
const fragment = `
precision highp float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
#define STEPS 96

mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
float hash(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}
vec3 center(float x){
  return vec3(
    x,
    sin(x*.86-uTime*.34)*.145+sin(x*1.82+uTime*.19)*.032,
    cos(x*.67+uTime*.23)*.09+smoothstep(1.15,2.08,x)*.34
  );
}
float tubeRadius(float x){return .116+sin(x*4.4-uTime*1.05)*.003;}
float map(vec3 p){
  p.xy=rot(-.19)*p.xy;
  p.y+=.035;
  vec3 c=center(p.x);
  float radial=length(vec2(p.y-c.y,p.z-c.z));
  float shell=abs(radial-tubeRadius(p.x))-.027;
  float ends=abs(p.x-.12)-1.94;
  return max(shell,ends);
}
vec3 normal(vec3 p){
  vec2 e=vec2(.0016,0.);
  return normalize(vec3(
    map(p+e.xyy)-map(p-e.xyy),
    map(p+e.yxy)-map(p-e.yxy),
    map(p+e.yyx)-map(p-e.yyx)
  ));
}
vec3 background(vec2 uv){
  float glow=exp(-2.2*length(uv-vec2(.56,.08)));
  float lift=smoothstep(-.95,.62,uv.y);
  vec3 c=mix(vec3(.035,.090,.155),vec3(.090,.212,.365),lift*.78);
  c+=glow*vec3(.035,.075,.125);
  vec2 g=abs(fract(uv*vec2(uResolution.x/max(uResolution.y,1.),1.)*7.)-.5);
  float line=max(smoothstep(.488,.5,g.x),smoothstep(.488,.5,g.y));
  c+=line*vec3(.014,.032,.052)*smoothstep(-.7,.55,uv.y);
  c+=(hash(gl_FragCoord.xy*.38)-.5)*.004;
  return c;
}
void main(){
  vec2 uv=(2.*gl_FragCoord.xy-uResolution.xy)/max(uResolution.y,1.);
  vec2 mouse=(uPointer-.5)*2.;
  vec3 back=background(uv);
  vec3 ro=vec3(mouse.x*.12,mouse.y*.075,3.18);
  vec3 rd=normalize(vec3(uv,-2.32));
  float t=0.,d=0.;
  bool hit=false;
  for(int i=0;i<STEPS;i++){
    d=map(ro+rd*t);
    if(d<.0013){hit=true;break;}
    t+=d*.62;
    if(t>7.5)break;
  }
  vec3 col=back;
  if(hit){
    vec3 p=ro+rd*t;
    vec3 n=normal(p),v=-rd;
    vec3 key=normalize(vec3(-.58,.82,.66));
    vec3 fill=normalize(vec3(.72,-.06,.62));
    float dif=max(dot(n,key),0.);
    float fillLight=max(dot(n,fill),0.);
    float facing=max(dot(n,v),0.);
    float rim=pow(1.-facing,2.25);
    float spec=pow(max(dot(reflect(-key,n),v),0.),92.);
    float specSoft=pow(max(dot(reflect(-fill,n),v),0.),38.);
    float travelling=.5+.5*sin(p.x*7.6-uTime*1.45);
    float flow=smoothstep(.74,1.,travelling);
    float boreShade=pow(facing,7.);
    vec3 local=p;
    local.xy=rot(-.19)*local.xy;
    local.y+=.035;
    vec3 localCenter=center(local.x);
    float localRadius=length(vec2(local.y-localCenter.y,local.z-localCenter.z));
    float nearEnd=smoothstep(1.56,1.93,abs(local.x-.12));
    float innerWall=1.-smoothstep(tubeRadius(local.x)-.034,tubeRadius(local.x)-.014,localRadius);
    float bore=nearEnd*innerWall;
    vec3 silicone=mix(vec3(.22,.35,.49),vec3(.70,.84,.91),.22+dif*.66);
    silicone+=fillLight*vec3(.07,.13,.20);
    silicone+=rim*vec3(.40,.62,.77);
    silicone+=spec*vec3(1.1,1.16,1.2)+specSoft*vec3(.28,.43,.57);
    silicone+=flow*vec3(.045,.085,.13);
    silicone-=boreShade*vec3(.055,.075,.095);
    silicone=mix(silicone,vec3(.018,.045,.078),bore*.92);
    col=mix(silicone,back,.10+.20*(1.-rim));
  }
  float vignette=1.-smoothstep(.68,1.7,length(uv*vec2(.74,1.)));
  col*=.86+vignette*.14;
  gl_FragColor=vec4(pow(col,vec3(.94)),1.);
}`

function shader(gl: WebGLRenderingContext, type: number, source: string) {
  const value = gl.createShader(type)
  if (!value) return null
  gl.shaderSource(value, source)
  gl.compileShader(value)
  if (!gl.getShaderParameter(value, gl.COMPILE_STATUS)) return null
  return value
}

export function SiliconeScene() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: true, depth: false })
    if (!gl) {
      canvas.classList.add('silicone-scene--fallback')
      return
    }

    const vs = shader(gl, gl.VERTEX_SHADER, vertex)
    const fs = shader(gl, gl.FRAGMENT_SHADER, fragment)
    if (!vs || !fs) {
      canvas.classList.add('silicone-scene--fallback')
      return
    }

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.classList.add('silicone-scene--fallback')
      return
    }

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
    gl.useProgram(program)

    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const resolution = gl.getUniformLocation(program, 'uResolution')
    const pointerUniform = gl.getUniformLocation(program, 'uPointer')
    const time = gl.getUniformLocation(program, 'uTime')
    const pointer = { x: .5, y: .5, tx: .5, ty: .5 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0

    const move = (event: PointerEvent) => {
      pointer.tx = event.clientX / innerWidth
      pointer.ty = 1 - event.clientY / innerHeight
    }

    const draw = (stamp: number) => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.round(rect.width * dpr))
      const height = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }

      pointer.x += (pointer.tx - pointer.x) * .04
      pointer.y += (pointer.ty - pointer.y) * .04
      gl.uniform2f(resolution, width, height)
      gl.uniform2f(pointerUniform, pointer.x, pointer.y)
      gl.uniform1f(time, reduced.matches ? 3.75 : stamp * .001)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      if (!reduced.matches) frame = requestAnimationFrame(draw)
    }

    addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('pointermove', move)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [])

  return <canvas ref={ref} className="silicone-scene" aria-hidden="true" />
}

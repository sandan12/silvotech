'use client'

import { useEffect, useRef } from 'react'

const vertex = `attribute vec2 aPosition; void main(){gl_Position=vec4(aPosition,0.,1.);}`
const fragment = `
precision highp float;
uniform vec2 uResolution; uniform vec2 uPointer; uniform float uTime;
#define STEPS 72
mat2 rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);}
float hash(vec2 p){p=fract(p*vec2(123.34,345.45));p+=dot(p,p+34.345);return fract(p.x*p.y);}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
vec3 center(float x){return vec3(x,sin(x*.92-uTime*.42)*.20+sin(x*2.14+uTime*.23)*.055,cos(x*.72+uTime*.28)*.15);}
float map(vec3 p){p.xy=rot(-.27)*p.xy;p.y+=.08;vec3 c=center(p.x);float r=.245+sin(p.x*3.6-uTime*1.28)*.022;float d=length(vec2(p.y-c.y,p.z-c.z))-r;for(int i=0;i<3;i++){float bx=mod(uTime*.31+float(i)*2.15+3.55,7.1)-3.55;d=smin(d,length(p-center(bx))-(.275+.025*sin(uTime*.8+float(i))),.18);}return d;}
vec3 normal(vec3 p){vec2 e=vec2(.0018,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
vec3 bg(vec2 uv){float glow=exp(-2.15*length(uv-vec2(.48,.04)));float h=smoothstep(-.9,.45,uv.y);vec3 c=mix(vec3(.014,.022,.029),vec3(.025,.052,.068),h)+glow*vec3(.035,.075,.092);vec2 g=abs(fract(uv*vec2(uResolution.x/max(uResolution.y,1.),1.)*7.)-.5);float line=max(smoothstep(.485,.5,g.x),smoothstep(.485,.5,g.y));c+=line*vec3(.012,.022,.027)*smoothstep(-.7,.45,uv.y);c+=(hash(gl_FragCoord.xy*.38)-.5)*.007;return c;}
void main(){vec2 uv=(2.*gl_FragCoord.xy-uResolution.xy)/max(uResolution.y,1.);vec2 mouse=(uPointer-.5)*2.;vec3 back=bg(uv),ro=vec3(mouse.x*.16,mouse.y*.1,3.35),rd=normalize(vec3(uv,-2.25));float t=0.,d=0.;bool hit=false;for(int i=0;i<STEPS;i++){d=map(ro+rd*t);if(d<.0015){hit=true;break;}t+=d*.68;if(t>8.)break;}vec3 col=back;if(hit){vec3 p=ro+rd*t,n=normal(p),v=-rd,l=normalize(vec3(-.52,.78,.62)),r=normalize(vec3(.72,-.08,.68));float dif=max(dot(n,l),0.),rim=pow(1.-max(dot(n,v),0.),2.45),sp=pow(max(dot(reflect(-l,n),v),0.),76.),sp2=pow(max(dot(reflect(-r,n),v),0.),42.);float flow=smoothstep(.76,1.,.5+.5*sin(p.x*7.2-uTime*2.05+p.y*3.));float warm=smoothstep(.88,1.,.5+.5*sin(p.x*3.1-uTime*.92));vec3 silicon=mix(vec3(.12,.18,.21),vec3(.67,.79,.82),dif)+max(dot(n,r),0.)*vec3(.09,.18,.22)+rim*vec3(.52,.72,.79)+sp*vec3(1.25,1.32,1.34)+sp2*vec3(.42,.64,.72)+flow*vec3(.08,.16,.18)+warm*vec3(.24,.075,.025)*(.2+rim*.8);col=mix(silicon,back,.18+.22*(1.-rim));}float vig=1.-smoothstep(.65,1.65,length(uv*vec2(.74,1.)));col*=.84+vig*.16;gl_FragColor=vec4(pow(col,vec3(.92)),1.);}`

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
    if (!gl) return canvas.classList.add('silicone-scene--fallback')
    const vs = shader(gl, gl.VERTEX_SHADER, vertex), fs = shader(gl, gl.FRAGMENT_SHADER, fragment)
    if (!vs || !fs) return canvas.classList.add('silicone-scene--fallback')
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return canvas.classList.add('silicone-scene--fallback')
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW)
    gl.useProgram(program)
    const position = gl.getAttribLocation(program, 'aPosition')
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
    const resolution = gl.getUniformLocation(program,'uResolution'), pointerUniform = gl.getUniformLocation(program,'uPointer'), time = gl.getUniformLocation(program,'uTime')
    const pointer = { x:.5, y:.5, tx:.5, ty:.5 }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    const move = (e: PointerEvent) => { pointer.tx=e.clientX/innerWidth; pointer.ty=1-e.clientY/innerHeight }
    const draw = (stamp:number) => {
      const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,1.5)
      const w=Math.max(1,Math.round(rect.width*dpr)), h=Math.max(1,Math.round(rect.height*dpr))
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}
      pointer.x+=(pointer.tx-pointer.x)*.045;pointer.y+=(pointer.ty-pointer.y)*.045
      gl.uniform2f(resolution,w,h);gl.uniform2f(pointerUniform,pointer.x,pointer.y);gl.uniform1f(time,reduced.matches?3.75:stamp*.001);gl.drawArrays(gl.TRIANGLES,0,6)
      if(!reduced.matches) frame=requestAnimationFrame(draw)
    }
    addEventListener('pointermove',move,{passive:true});frame=requestAnimationFrame(draw)
    return()=>{cancelAnimationFrame(frame);removeEventListener('pointermove',move);gl.deleteProgram(program);gl.deleteShader(vs);gl.deleteShader(fs)}
  },[])
  return <canvas ref={ref} className="silicone-scene" aria-hidden="true" />
}

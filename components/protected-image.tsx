import Image, { type ImageProps } from 'next/image';

export default function ProtectedImage(props: ImageProps) {
  return (
    <div className="protected-media" data-protected-media>
      <Image {...props} draggable={false} />
      <span className="media-shield" aria-hidden />
    </div>
  );
}

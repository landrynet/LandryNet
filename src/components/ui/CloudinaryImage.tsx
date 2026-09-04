import Image from "next/image";

type CloudinaryImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
};

export function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 500,
  sizes = "(max-width: 700px) 100vw, 50vw",
  priority = false,
  quality = 90,
  className,
}: CloudinaryImageProps) {
  if (!src) return null;
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} quality={quality} className={className} />;
}

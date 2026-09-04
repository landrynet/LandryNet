import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type ProjectImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
};

export function ProjectImage({ src, alt, className, width = 800, height = 520 }: ProjectImageProps) {
  if (src) return <CloudinaryImage src={src} alt={alt} width={width} height={height} quality={92} className={className} />;
  return <div className={`project-image-placeholder ${className ?? ""}`} aria-label="Image non disponible"><span>LN</span></div>;
}

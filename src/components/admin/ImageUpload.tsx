"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { CloudinaryImage } from "@/components/ui/CloudinaryImage";

type ImageUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  onRemove: () => void;
  label?: string;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "21/9";
};

const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function ImageUpload({ value, onChange, onRemove, label = "Image", aspectRatio = "16/9" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError("Format accepté : JPG, PNG, WebP ou GIF.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("La taille maximale est de 5 MB.");
      return;
    }

    setError(null);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error ?? "Upload impossible.");
      onChange(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload impossible.");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) void handleUpload(file);
    event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) void handleUpload(file);
  };

  return (
    <div className="image-upload">
      <span className="image-upload__label">{label}</span>
      {value ? (
        <div className={`image-upload__preview-wrap image-upload__preview-wrap--${aspectRatio.replace("/", "-")}`}>
          <CloudinaryImage src={value} alt="Aperçu de l’image" width={1600} height={900} quality={100} sizes="(max-width: 700px) 100vw, 900px" className="image-upload__preview" />
          <div className="image-upload__actions">
            <button type="button" onClick={() => inputRef.current?.click()}>Changer</button>
            <button type="button" onClick={onRemove}>Supprimer</button>
          </div>
        </div>
      ) : (
        <div
          className={`image-upload__dropzone ${dragActive ? "is-active" : ""}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => { event.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
        >
          <span className="image-upload__icon">+</span>
          <strong>{isUploading ? "Upload en cours..." : "Choisir ou déposer une image"}</strong>
          <small>JPG, PNG, WebP ou GIF · 5 MB maximum</small>
        </div>
      )}
      <input ref={inputRef} type="file" accept={allowedTypes.join(",")} onChange={onFileChange} hidden />
      {error ? <small className="image-upload__error">{error}</small> : null}
    </div>
  );
}

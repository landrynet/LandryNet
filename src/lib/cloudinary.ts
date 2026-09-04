import { v2 as cloudinary } from "cloudinary";

const isConfigured = Boolean(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET,
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export function cloudinaryEnabled() {
  return isConfigured;
}

export async function uploadImage(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise<string>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "portfolio", resource_type: "image", transformation: [{ quality: "auto", fetch_format: "auto" }] },
      (error, result) => error || !result ? reject(error ?? new Error("Cloudinary upload failed")) : resolve(result.secure_url),
    ).end(buffer);
  });
}

export async function deleteImage(url: string) {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-zA-Z0-9]+)?$/);
  if (!match?.[1]) return;
  await cloudinary.uploader.destroy(match[1], { resource_type: "image" });
}

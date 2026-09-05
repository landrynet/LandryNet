"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type GalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="gallery-section">
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div key={img.id} className="gallery-thumbnail" onClick={() => { setCurrentIndex(idx); setIsOpen(true); }}>
            <Image src={img.url} alt={img.alt || "Project image"} fill className="object-cover" />
          </div>
        ))}
      </div>

      {isOpen && (
        <div className="lightbox-overlay" onClick={() => setIsOpen(false)}>
          <button className="lightbox-close" onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}>✕</button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={images[currentIndex].url} 
              alt={images[currentIndex].alt || "Enlarged image"} 
              fill 
              className="object-contain" 
            />
            
            {images.length > 1 && (
              <>
                <button 
                  className="lightbox-nav lightbox-prev" 
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); }}
                >
                  ←
                </button>
                <button 
                  className="lightbox-nav lightbox-next" 
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex((prev) => (prev + 1) % images.length); }}
                >
                  →
                </button>
                <div className="lightbox-counter">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
          margin-top: 32px;
        }
        .gallery-thumbnail {
          position: relative;
          aspect-ratio: 4/3;
          cursor: zoom-in;
          overflow: hidden;
          border: 1px solid var(--line);
          transition: border-color 0.2s;
        }
        .gallery-thumbnail:hover {
          border-color: var(--accent);
        }
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .lightbox-content {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 1200px;
          max-height: 80vh;
        }
        .lightbox-close {
          position: absolute;
          top: 20px;
          right: 30px;
          background: none;
          border: none;
          color: white;
          font-size: 32px;
          cursor: pointer;
          z-index: 1001;
        }
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: white;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.2s;
        }
        .lightbox-nav:hover {
          background: rgba(255,255,255,0.2);
        }
        .lightbox-prev { left: 20px; }
        .lightbox-next { right: 20px; }
        .lightbox-counter {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.7);
          font-size: 14px;
        }
        @media (max-width: 768px) {
          .lightbox-nav { display: none; }
        }
      `}</style>
    </div>
  );
}

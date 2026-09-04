"use client";

import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export function Toast({ type, message, onClose }: { type: ToastType; message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <strong>{type === "success" ? "Succès" : type === "error" ? "Erreur" : "Info"}</strong>
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Fermer la notification">×</button>
    </div>
  );
}

export function ToastViewport({ toasts }: { toasts: { id: string; type: ToastType; message: string }[] }) {
  return (
    <div className="toast-viewport">
      {toasts.map((toast) => (
        <Toast key={toast.id} type={toast.type} message={toast.message} onClose={() => {}} />
      ))}
    </div>
  );
}

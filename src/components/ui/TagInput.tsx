"use client";

import { useState } from "react";

export function TagInput({ value, onChange, placeholder }: { value: string[]; onChange: (next: string[]) => void; placeholder?: string }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const cleaned = input.trim();
    if (!cleaned) return;
    if (!value.includes(cleaned)) onChange([...value, cleaned]);
    setInput("");
  };

  return (
    <div className="tag-input">
      <div className="tag-input__list">
        {value.map((tag) => (
          <span key={tag} className="tag-pill">
            {tag}
            <button type="button" onClick={() => onChange(value.filter((item) => item !== tag))}>×</button>
          </span>
        ))}
      </div>
      <div className="tag-input__controls">
        <input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addTag(); } }} placeholder={placeholder ?? "Ajouter un tag"} />
        <button type="button" className="button button-outline" onClick={addTag}>Ajouter</button>
      </div>
    </div>
  );
}

"use client";

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string; }) {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span className="toggle-switch__track" aria-label={label} />
      <span>{label}</span>
    </label>
  );
}

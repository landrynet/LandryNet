import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function formatDate(date: Date) {
  return format(date, "d MMMM yyyy", { locale: fr });
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function parseList(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

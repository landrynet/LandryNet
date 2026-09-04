import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
};

export function ButtonLink({ children, className, ...props }: ButtonLinkProps) {
  return <Link className={cn("button", className)} {...props}>{children}</Link>;
}

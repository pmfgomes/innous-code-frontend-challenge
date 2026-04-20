import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FileRouteTypes } from "@/routeTree.gen";

interface ButtonLinkProps {
  children: ReactNode;
  className?: string;
  path: FileRouteTypes["to"];
}

export function ButtonLink({ children, className, path }: ButtonLinkProps) {
  return (
    <Link
      to={path}
      className={cn(
        buttonVariants({ variant: "outline", size: "lg" }),
        "min-h-14 rounded-[0.7rem] border-2 border-brand-gold bg-transparent px-5 text-[0.95rem] font-normal tracking-[0.04em] text-white/85 uppercase shadow-[inset_0_0_0_1px_rgba(34,34,34,0.88),0_0_0_1px_rgba(209,169,124,0.12)] transition-[transform,background-color,color,box-shadow] duration-200 hover:scale-[1.01] hover:bg-white/3 hover:text-white focus-visible:ring-2 focus-visible:ring-brand-gold/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#393939] dark:border-brand-gold dark:bg-transparent dark:text-white/85",
        className
      )}
    >
      {children}
    </Link>
  );
}

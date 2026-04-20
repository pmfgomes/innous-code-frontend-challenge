import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

function Breadcrumb({ ...props }: ComponentPropsWithoutRef<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn("flex flex-wrap items-center gap-1.5 text-sm text-white/55 wrap-break-word sm:gap-2.5", className)}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li data-slot="breadcrumb-item" className={cn("inline-flex items-center gap-1.5", className)} {...props} />;
}

function BreadcrumbLink({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return <a data-slot="breadcrumb-link" className={cn("transition-colors hover:text-white", className)} {...props} />;
}

function BreadcrumbPage({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      aria-current="page"
      data-slot="breadcrumb-page"
      className={cn("font-medium text-white", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ className, children, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li aria-hidden="true" data-slot="breadcrumb-separator" className={cn("text-white/30", className)} {...props}>
      {children ?? <ChevronRight className="size-3.5" />}
    </li>
  );
}

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator };

import { Search, X } from "lucide-react";
import { useEffect, useId, useState, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface SearchFilterProps {
  value: string;
  onSubmit: (value: string) => void;
  placeholder?: string;
  label: string;
  className?: string;
  inputClassName?: string;
}

export function SearchFilter({
  value,
  onSubmit,
  placeholder = "Search...",
  label,
  className,
  inputClassName,
}: SearchFilterProps) {
  const [draftValue, setDraftValue] = useState(value);
  const inputId = useId();

  useEffect(() => {
    setDraftValue(value);
  }, [value]);

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();
    onSubmit(draftValue);
  };

  function handleClear() {
    setDraftValue("");
    onSubmit("");
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "flex h-13 w-full items-center gap-3 rounded-full border border-white/6 bg-[#3a3a3a] px-5 text-sm text-[#e6e0d6] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] xl:max-w-90",
        className
      )}
    >
      <Search className="size-4.5 shrink-0 text-[#d1a97c]" />
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        value={draftValue}
        onChange={(event) => setDraftValue(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "playlist-search-input w-full bg-transparent text-sm text-[#e6e0d6] placeholder:text-[#bfb8ac] outline-none",
          inputClassName
        )}
      />
      {draftValue ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="shrink-0 rounded-full p-1 text-[#d1a97c] transition-colors hover:text-[#f2e5ce] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d1a97c]/60"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </form>
  );
}

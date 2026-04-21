import Fuse, { type IFuseOptions } from "fuse.js";
import { useMemo } from "react";

export function useFuzzySearch<T extends object>(items: T[], query: string, options: IFuseOptions<T>): T[] {
  const normalizedQuery = query.trim();

  const fuse = useMemo(() => new Fuse(items, options), [items, options]);

  return useMemo(() => {
    if (!normalizedQuery) {
      return items;
    }

    return fuse.search(normalizedQuery).map((result) => result.item);
  }, [fuse, items, normalizedQuery]);
}

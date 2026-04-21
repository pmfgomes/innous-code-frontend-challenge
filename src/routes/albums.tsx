import { createFileRoute } from "@tanstack/react-router";

import { AlbumsPage } from "@/pages/albums";

export const Route = createFileRoute("/albums")({
  component: AlbumsPage,
});

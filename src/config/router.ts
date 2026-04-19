import { createRouter } from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});

// Register the router type for global type inference
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

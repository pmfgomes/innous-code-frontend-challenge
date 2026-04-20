import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/albums")({
  component: AlbumsPage,
});

function AlbumsPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-off-white px-6 py-10 text-brand-black">
      <div className="rounded-2xl border border-brand-gold/50 bg-white/70 px-8 py-6 text-center shadow-[0_18px_40px_rgba(26,26,26,0.08)] backdrop-blur-sm">
        <h1 className="text-3xl font-semibold tracking-[0.04em]">Albums</h1>
      </div>
    </main>
  );
}

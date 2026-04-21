import { ButtonLink } from "@/components/button-link";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#393939] px-6 py-10">
      <div className="flex flex-col gap-4">
        <ButtonLink path="/albums">Get Albums</ButtonLink>
        <ButtonLink path="/playlist">Get Playlist</ButtonLink>
      </div>
    </main>
  );
}

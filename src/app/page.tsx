import { MovieGrid } from "@/components/MovieGrid/MovieGrid";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>My Movie Reviews</h1>
      <Button>Add Review</Button>
      <MovieGrid />
    </main>
  );
}

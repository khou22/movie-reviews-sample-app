import { MovieGrid } from "@/components/MovieGrid/MovieGrid";
import { NewReview } from "@/components/NewReview/NewReview";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 space-y-8">
      <h1>My Movie Reviews</h1>
      <NewReview />
      <MovieGrid />
    </main>
  );
}

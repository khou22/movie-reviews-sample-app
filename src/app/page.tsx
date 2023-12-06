import { MovieGrid } from "@/components/MovieGrid/MovieGrid";
import { NewReview } from "@/components/NewReview/NewReview";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>My Movie Reviews</h1>
      <NewReview />
      <MovieGrid />
    </main>
  );
}

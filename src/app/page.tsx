import { MovieGrid } from "@/components/MovieGrid/MovieGrid";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>My Movie Reviews</h1>
      <Button>
        <PlusIcon className="mr-2 h-4 w-4" /> Add Review
      </Button>
      <MovieGrid />
    </main>
  );
}

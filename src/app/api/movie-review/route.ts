import { MovieReview } from "@/models";
import { NextRequest } from "next/server";
import { NewMovieReviewRequest } from "./service";

export async function POST(req: NextRequest) {
  const reqBody = (await req.json()) as NewMovieReviewRequest;
  const movieRecord: MovieReview = {
    id: crypto.randomUUID(),
    title: reqBody.title,
    review: reqBody.review,
    rating: reqBody.rating,
    imageUrl: reqBody.image_url,
    createdAt: new Date(),
  };

  console.log(`Saving movie record: ${JSON.stringify(movieRecord)}`);
  return new Response("MongoDB insert unimplemented", { status: 500 });
}

export type GetMoviesResponse = {
  reviews: MovieReview[];
};

export async function GET(_req: NextRequest) {
  const response: GetMoviesResponse = { reviews: [] };
  return new Response("MongoDB query unimplemented", { status: 500 });
}

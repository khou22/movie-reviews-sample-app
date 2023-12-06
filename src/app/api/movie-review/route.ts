import { MovieReview } from "@/models";
import { NextRequest } from "next/server";

export type NewMovieReviewRequest = {
  title: string;
  review: string;
  rating: number;
  image_url: string;
};

export type NewMovieReviewResponse = {
  review: MovieReview;
};

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
  console.log(`[movie-review] POST: ${JSON.stringify(movieRecord)}`);

  return new Response(JSON.stringify(movieRecord), { status: 200 });
}

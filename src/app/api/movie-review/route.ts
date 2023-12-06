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

  return new Response("Success", { status: 200 });
}

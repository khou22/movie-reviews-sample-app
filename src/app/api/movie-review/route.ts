import { MovieReview } from "@/models";
import { NextRequest } from "next/server";
import { NewMovieReviewRequest } from "./service";

const uri = process.env.MONGO_DB_URI as string;
if (!uri) {
  throw new Error("Missing environment variable MONGO_DB_URI");
}

const mongoDbId = "movie-reviews-sample";
const mongoDbCollectionId = "movie-reviews";

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

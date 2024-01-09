import { MovieReview } from "@/models";
import { NextRequest } from "next/server";
import { NewMovieReviewRequest } from "./service";
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI as string;
if (!uri) {
  throw new Error("Missing environment variable MONGO_DB_URI");
}

const mongoDbId = "movie-reviews-sample";
const mongoDbCollectionId = "movie-reviews";

/**
 * Inserts a new movie review into the MongoDB database.
 *
 * @param {NextRequest} req - The incoming request object.
 * @return {Promise<Response>} - A promise that resolves to the server response.
 */
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

  return new Response("Unimplemented", { status: 501 });
}

export type GetMoviesResponse = {
  reviews: MovieReview[];
};

export async function GET(_req: NextRequest) {
  return new Response("Unimplemented", { status: 501 });
}

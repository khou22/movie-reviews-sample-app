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

  const client = new MongoClient(uri);

  // Connect to MongoDB and insert a new document.
  try {
    await client.connect();
    const database = client.db(mongoDbId);
    const collection = database.collection(mongoDbCollectionId);
    await collection.insertOne(movieRecord);
    return new Response(JSON.stringify(movieRecord), { status: 200 });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  } finally {
    client.close();
  }
}

export type GetMoviesResponse = {
  reviews: MovieReview[];
};

export async function GET(_req: NextRequest) {
  const client = new MongoClient(uri);

  try {
    // Read all movie reviews from my collection.
    await client.connect();
    const database = client.db(mongoDbId);
    const collection = database.collection(mongoDbCollectionId);
    const movieRecords = await collection.find({}).toArray();

    const movies = movieRecords.map((movieRecord) => {
      return {
        id: movieRecord.id,
        title: movieRecord.title,
        review: movieRecord.review,
        rating: movieRecord.rating,
        imageUrl: movieRecord.imageUrl,
        createdAt: movieRecord.createdAt,
      };
    });
    const response: GetMoviesResponse = {
      reviews: movies,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return new Response(e.message, { status: 500 });
    }
  } finally {
    client.close();
  }
}

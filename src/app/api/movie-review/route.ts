import { MovieReview } from "@/models";
import { mongoClient } from "@/utils/mongodb";
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

export type GetMoviesResponse = {
  reviews: MovieReview[];
};

export async function GET(req: NextRequest) {
  try {
    await mongoClient.connect();

    // Send a ping to confirm a successful connection
    await mongoClient.db("admin").command({ ping: 1 });

    const db = mongoClient.db("your-database-name");
    const collection = db.collection("your-collection-name");

    const documents = await collection.find({}).toArray();
    const reviews = documents.map((doc) => {
      return {
        id: doc.id,
        title: doc.title,
        review: doc.review,
        rating: doc.rating,
        imageUrl: doc.imageUrl,
        createdAt: doc.createdAt,
      };
    });

    const response: GetMoviesResponse = {
      reviews,
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoClient.close();
  }
}

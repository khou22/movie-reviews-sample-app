import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_DB_URI as string;
if (!uri) {
  throw new Error("Missing environment variable MONGO_DB_URI");
}
export const mongoClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const movieReviewsDbName = "movie-reviews-sample";
export const movieReviewsConnectionId = "movie-reviews";

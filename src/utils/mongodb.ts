const uri = process.env.MONGO_DB_URI as string;
if (!uri) {
  throw new Error("Missing environment variable MONGO_DB_URI");
}

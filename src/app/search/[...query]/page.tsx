import { MovieReview } from "@/models";
import { getMongoUri, mongoDbCollectionId, mongoDbId } from "@/utils/mongodb";
import { MongoClient } from "mongodb";
import { NextPage } from "next";

type SearchPageParams = {
  params: {
    query: string[];
  };
};

const SearchPage: NextPage<SearchPageParams> = async ({
  params: { query },
}) => {
  const queryStr = query.join("");
  let movies: MovieReview[] = [];

  const mongo = new MongoClient(getMongoUri());

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 space-y-8">
      <h1>Search Results: &quot;{queryStr}&quot;</h1>
      <p>Results: {movies.length}</p>
    </main>
  );
};

export default SearchPage;

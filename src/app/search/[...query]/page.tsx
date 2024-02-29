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

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24 space-y-8">
      <h1>Search Results: &quot;{queryStr}&quot;</h1>
    </main>
  );
};

export default SearchPage;

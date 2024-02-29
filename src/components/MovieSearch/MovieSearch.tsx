"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { PAGES } from "@/utils/pages";

export const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <form
      className="w-full flex justify-center items-center space-x-2"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(PAGES.SEARCH(searchTerm));
      }}
    >
      <Input
        placeholder="Search for a review"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md"
      />
      <Button type="submit" disabled={searchTerm.trim().length === 0}>
        Search
      </Button>
    </form>
  );
};

"use client";

import { MovieReview } from "@/models";
import { useEffect, useState } from "react";
import { mockMovieReviews } from "@/mock";
import moment from "moment";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Alert } from "../ui/alert";
import { GetMoviesResponse } from "@/app/api/movie-review/route";
import { Card } from "../ui/card";

export const MovieGrid = () => {
  const [movieReviews, setMovieReviews] = useState<MovieReview[]>([]);
  const [useMockData, setUseMockData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const getMovieReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        if (useMockData) {
          setMovieReviews(mockMovieReviews);
          return;
        }

        const response = await fetch("/api/movie-review");
        if (!response.ok) {
          throw new Error(await response.text());
        }
        const data = (await response.json()) as GetMoviesResponse;
        if (!cancelled) {
          setMovieReviews(data.reviews);
        }
      } catch (e) {
        if (!cancelled && e instanceof Error) {
          setError(e);
          setMovieReviews([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    getMovieReviews();

    return () => {
      cancelled = true;
    };
  }, [useMockData]);

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 w-full flex-row justify-center mb-4">
        <Switch
          id="mock-data"
          checked={useMockData}
          onCheckedChange={setUseMockData}
        />
        <Label htmlFor="mock-data">Use Mock Data</Label>
      </div>

      {error && <Alert variant="destructive">{error.message}</Alert>}

      {isLoading && <p className="caption text-center my-16">Loading...</p>}

      {!isLoading && movieReviews.length === 0 && (
        <p className="text-center my-16">No movie reviews found.</p>
      )}

      <div className="grid grid-cols-2 my-6 gap-8">
        {movieReviews.map((movieReview) => (
          <Card
            key={movieReview.id}
            className="w-full h-full flex flex-row justify-start items-center rounded px-6 py-4 space-x-6 shadow"
          >
            <img
              className="aspect-[2/3] h-52"
              src={movieReview.imageUrl}
              alt={movieReview.title}
            />
            <div className="flex flex-col items-start justify-center">
              <h3>{movieReview.title}</h3>
              <p className="leading-loose">
                Reviewed on{" "}
                {moment(movieReview.createdAt).format("MMMM Do YYYY")}
              </p>
              <div className="flex flex-row items-center justify-start text-yellow-500 mb-3 mt-1">
                {[...Array(movieReview.rating)].map((_, index) => (
                  <span key={index}>&#9733;</span>
                ))}
              </div>
              <p className="caption italic">{movieReview.review}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

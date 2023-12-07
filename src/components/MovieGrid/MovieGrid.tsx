"use client";

import { MovieReview } from "@/models";
import { useEffect, useState } from "react";
import { mockMovieReviews } from "@/mock";
import moment from "moment";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Alert } from "../ui/alert";

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

        const data = await fetch("/api/movie-review")
          .then((res) => res.json())
          .then((data) => data as MovieReview[]);
        if (!cancelled) {
          setMovieReviews(data);
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

      {isLoading && <p>Loading...</p>}

      <div className="grid grid-cols-1 my-2 gap-8">
        {movieReviews.map((movieReview) => (
          <div
            key={movieReview.id}
            className="w-full h-full flex flex-row justify-between items-center bg-slate-800 rounded px-6 py-4 space-x-6 shadow"
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
          </div>
        ))}
      </div>
    </div>
  );
};

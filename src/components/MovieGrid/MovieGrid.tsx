"use client";

import { MovieReview } from "@/models";
import { useState } from "react";
import Image from "next/image";
import { mockMovieReviews } from "@/mock";
import moment from "moment";

export const MovieGrid = () => {
  const [movieReviews, setMovieReviews] =
    useState<MovieReview[]>(mockMovieReviews);

  return (
    <div className="grid grid-cols-1 my-2 gap-8">
      {movieReviews.map((movieReview) => (
        <div
          key={movieReview.id}
          className="w-full h-full flex flex-row justify-between items-center bg-slate-200 rounded p-4 space-x-6 shadow"
        >
          <img
            className="aspect-[2/3] h-52"
            src={movieReview.imageUrl}
            alt={movieReview.title}
          />
          <div className="flex flex-col items-start justify-center">
            <h3>{movieReview.title}</h3>
            <p className="caption font-light italic leading-loose">
              Reviewed on {moment(movieReview.createdAt).format("MMMM Do YYYY")}
            </p>
            <div className="flex flex-row items-center justify-start text-yellow-500 mb-3">
              {[...Array(movieReview.rating)].map((_, index) => (
                <span key={index}>&#9733;</span>
              ))}
            </div>
            <p className="caption italic">{movieReview.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

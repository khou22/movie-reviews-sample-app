import { MovieReview } from "@/models";

export type NewMovieReviewRequest = {
  title: string;
  review: string;
  rating: number;
  image_url: string;
};

export type NewMovieReviewResponse = {
  review: MovieReview;
};

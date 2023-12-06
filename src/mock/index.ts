import { MovieReview } from "@/models";

export const mockMovieReviews: MovieReview[] = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    review:
      "I wanted to hate this movie for its sappy, sentimental, 'life is good' message, but it was just too darn good. I'm not sure if I should thank Tim Robbins for his outstanding performance or curse him for making me feel something.",
    rating: 5,
    createdAt: new Date("2022-01-01 00:00:00"),
  },
  {
    id: "2",
    title: "Pulp Fiction",
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    review:
      "I'm not sure if it's the drugs, the non-linear story, or just how cool everyone is, but I really enjoyed this movie. I'm not sure what it's about, but I know it's good.",
    rating: 5,
    createdAt: new Date("2022-01-01 00:00:00"),
  },
];

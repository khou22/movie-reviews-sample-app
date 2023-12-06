"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";
import { Textarea } from "../ui/textarea";
import { CheckIcon } from "@radix-ui/react-icons";
import { NewMovieReviewRequest } from "@/app/api/movie-review/route";
import { Label } from "../ui/label";

const generateFormSchema = z.object({
  title: z.string().min(1),
  imageURL: z.string().min(1),
  review: z.string().min(1),
  rating: z.number().min(1).max(5),
});
type GenerateFormValues = z.infer<typeof generateFormSchema>;

type MovieReviewFormProps = {
  handleClose: () => void;
};

export const MovieReviewForm: React.FC<MovieReviewFormProps> = ({
  handleClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "Interstellar",
      imageURL:
        "https://en.wikipedia.org/wiki/File:Interstellar_film_poster.jpg",
      review: "",
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<GenerateFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const payload: NewMovieReviewRequest = {
        title: data.title,
        image_url: data.imageURL,
        review: data.review,
        rating: data.rating,
      };
      const response = await fetch("/api/movie-review", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      setSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        setError("root", e);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 grid w-full grid-cols-1 gap-3"
    >
      <Label>Movie Title</Label>
      <Input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}
      <Label>Movie Poster URL</Label>
      <Input
        type="text"
        placeholder="Image URL"
        {...register("imageURL", { required: true })}
      />
      {errors.imageURL && (
        <p className="text-red-500 text-sm">{errors.imageURL.message}</p>
      )}
      <Controller
        name="rating"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <div className="flex flex-col space-y-2">
            <Label>Rating</Label>
            <StarRating
              value={field.value}
              onChange={(newValue) => setValue("rating", newValue)}
            />
          </div>
        )}
      />
      <Label>Review</Label>
      {errors.rating && (
        <p className="text-red-500 text-sm">{errors.rating.message}</p>
      )}
      <Textarea
        rows={4}
        placeholder="Review"
        {...register("review", { required: true })}
      />
      {errors.review && (
        <p className="text-red-500 text-sm">{errors.review.message}</p>
      )}
      <Button type="submit" className="min-w-[200px]" disabled={submitted}>
        {submitted ? " Submitted" : isSubmitting ? "Submitting..." : "Submit"}
      </Button>
      {submitted && (
        <p className="text-green-500 text-sm text-center leading-loose">
          <CheckIcon className="w-5 h-5 inline mr-1" />
          Thank you for your review!
        </p>
      )}
      {errors.root && (
        <p className="text-red-500 text-sm">{errors.root.message}</p>
      )}
    </form>
  );
};

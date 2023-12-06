"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { StarRating } from "../StarRating/StarRating";

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
  const [submitted, setSubmitted] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      imageURL: "",
      review: "",
      rating: 0,
    },
  });

  const onSubmit: SubmitHandler<GenerateFormValues> = async (data) => {
    console.log("Submit", data);
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 grid w-full grid-cols-1 gap-3"
    >
      <Input
        type="text"
        placeholder="Title"
        {...register("title", { required: true })}
      />
      {errors.title && (
        <p className="text-red text-sm">{errors.title.message}</p>
      )}
      <Input
        type="text"
        placeholder="Image URL"
        {...register("imageURL", { required: true })}
      />
      {errors.imageURL && (
        <p className="text-red text-sm">{errors.imageURL.message}</p>
      )}
      <Input
        type="text"
        placeholder="Review"
        {...register("review", { required: true })}
      />
      {errors.review && (
        <p className="text-red text-sm">{errors.review.message}</p>
      )}
      <Controller
        name="rating"
        control={control}
        rules={{ required: true }}
        render={() => (
          <StarRating
            value={getValues("rating")}
            onChange={(newValue) => setValue("rating", newValue)}
          />
        )}
      />
      {errors.rating && (
        <p className="text-red text-sm">{errors.rating.message}</p>
      )}
      <Button type="submit" className="min-w-[200px]" disabled={submitted}>
        {submitted ? " Submitted" : "Submit"}
      </Button>
      {submitted && (
        <p className="text-green text-sm">Thank you for your review!</p>
      )}
      {errors.root && <p className="text-red text-sm">{errors.root.message}</p>}
    </form>
  );
};
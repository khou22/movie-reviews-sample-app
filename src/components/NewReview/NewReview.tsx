"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { MovieReviewForm } from "./MovieReviewForm";
import { useState } from "react";

export const NewReview = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Movie Review</DialogTitle>
          <DialogDescription>
            Add a new movie review for a movie.
          </DialogDescription>
        </DialogHeader>
        <MovieReviewForm handleClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

"use client";

import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import Button from "../uiComponents/Button";
import { cn } from "@/lib/utils";
import { ProductDetail, Review } from "@/lib/type";
import { addReview } from "@/lib/actions";
import { updateReview } from "@/lib/api";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

interface Props {
  rating: number;
  review: string;
}

const ReviewForm = ({
  product,
  loggedInUserEmail,
  editMode = false,
  existingReview = null,
  onClose,
  onReviewUpdate
}: {
  product: ProductDetail,
  loggedInUserEmail: string | null | undefined,
  editMode?: boolean,
  existingReview?: Review | null,
  onClose?: () => void,
  onReviewUpdate?: (updatedReview: { rating: number; comment: string }) => void
}) => {

  const {id, slug} = product;
  const [customerReview, setCustomerReview] = useState(editMode && existingReview ? existingReview.comment : '');
  const [reviewbtnLoading, setReviewbtnLoading] = useState(false);

  const [hoverRating, setHoverRating] = useState(0);
  const [hoverReview, setHoverReview] = useState("");

  const ratings = [
    { rating: 1, review: "Poor" },
    { rating: 2, review: "Fair" },
    { rating: 3, review: "Good" },
    { rating: 4, review: "Very Good" },
    { rating: 5, review: "Excellent" },
  ];

  const [clickedRating, setClickedRating] = useState(editMode && existingReview ? existingReview.rating : 0);
  const [clickedReview, setClickedReview] = useState(editMode && existingReview ? 
    ratings.find(r => r.rating === existingReview.rating)?.review || "" : "");
  const router = useRouter();

  const handleStarClick = ({ rating, review }: Props) => {
    setClickedRating(rating);
    setClickedReview(review);
  };

  const handleHoverIn = ({ rating, review }: Props) => {
    setHoverRating(rating);
    setHoverReview(review);
  };

  const handleHoverOut = () => {
    setHoverRating(0);
    setHoverReview("");
  };

  async function handleCreateReview(e: React.FormEvent) {
    e.preventDefault();

    setReviewbtnLoading(true);

    try {
      if (editMode && existingReview) {
        // Update existing review
        await updateReview(existingReview.id, { 
          rating: clickedRating, 
          comment: customerReview 
        });
        toast.success("Review updated successfully");
        
        // Update parent component state immediately
        if (onReviewUpdate) {
          onReviewUpdate({ rating: clickedRating, comment: customerReview });
        }
        
        router.refresh(); // Refresh the page to show updated data
        if (onClose) onClose();
      } else {
        // Add new review
        const formData = new FormData();
        formData.set("product_id", id.toString());
        formData.set("slug", slug);
        formData.set("review", customerReview);
        formData.set("rating", clickedRating.toString());
        formData.set("email", String(loggedInUserEmail));

        await addReview(formData);
        toast.success("Review added successfully");
        setCustomerReview("");
        setClickedRating(0);
        setClickedReview("");
        setHoverRating(0);
        setHoverReview("");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
        throw new Error(err.message);
      } else {
        toast.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    } finally {
      setReviewbtnLoading(false);
    }
  }

  return (
    <div className="w-full mx-auto bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">
        {editMode ? "Edit Review" : "Rate and review this product"}
      </h3>

      <div className="flex items-center justify-center gap-2 mb-4">
        {ratings.map(({ rating, review }) => (
          <Star
            key={rating}
            onPointerEnter={() => handleHoverIn({ rating, review })}
            onPointerLeave={handleHoverOut}
            onClick={() => handleStarClick({ rating, review })}
            className={cn(
              "w-7 h-7 cursor-pointer text-black hover:text-black transition",
              rating <= hoverRating ||
                (rating <= clickedRating && hoverRating < 1)
                ? "fill-black"
                : ""
            )}
          />
        ))}
      </div>

      <p className="text-center text-gray-600 text-sm">
        {hoverReview || clickedReview || "Review Score"}
      </p>

      {/* Review Form */}

      <form className="flex flex-col gap-4 mt-4" onSubmit={handleCreateReview}>
        <Textarea
          name="review"
          value={customerReview}
          onChange={(e) => setCustomerReview(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-300 rounded-lg p-3 w-full resize-none h-32"
          placeholder="Write your review..."
          required
          rows={6}
        />

        {editMode ? (
          <div className="flex gap-3">
            <Button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={clickedRating < 1 ||
                (customerReview && customerReview.trim()).length == 0 ||
                reviewbtnLoading
              }
            >
              {reviewbtnLoading ? "Updating review..." : "Update Review"}
            </Button>
          </div>
        ) : (
          <Button 
            className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" 
            disabled={clickedRating < 1 ||
              (customerReview && customerReview.trim()).length == 0 ||
              reviewbtnLoading
            }
          >
            {reviewbtnLoading ? "Adding review..." : "Add Review"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default ReviewForm;
"use client";
import { Review } from "@/lib/type";
import { User } from 'next-auth'
import { PenIcon, Star, TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition, useEffect } from "react";
import { timeAgo } from "@/lib/utils";
import { updateReview, deleteReview } from "@/lib/api";
import { useRouter } from "next/navigation";
import ReviewForm from "./ReviewForm";
import Modal from "../uiComponents/Modal";
import Button from "../uiComponents/Button";

const ReviewCard = ({ review, loggedInUser }: { review: Review, loggedInUser: User | undefined | null }) => {
  const starArray = [1, 2, 3, 4, 5];
  const [currentRating, setCurrentRating] = useState<number>(review.rating);
  const [isPending, startTransition] = useTransition();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const isOwner = loggedInUser?.email === review.user.email;

  // Update local state when review prop changes
  useEffect(() => {
    setCurrentRating(review.rating);
  }, [review.rating]);

  const handleRate = (value: number) => {
    if (!isOwner || isPending) return;
    setCurrentRating(value);
    startTransition(async () => {
      try {
        await updateReview(review.id, { rating: value });
        router.refresh();
      } catch (err: unknown) {
        // Revert on error
        setCurrentRating(review.rating);
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("Failed to update rating");
        }
      }
    });
  };

  const handleDelete = () => {
    if (!isOwner || isPending) return;
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      try {
        await deleteReview(review.id);
        setShowDeleteModal(false);
        router.refresh();
      } catch (err: unknown) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("Failed to delete review");
        }
      }
    });
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleReviewUpdate = (updatedReview: { rating: number; comment: string }) => {
    // Update local state immediately when review is updated
    setCurrentRating(updatedReview.rating);
  };

  return (
    <div className="w-full bg-white shadow-lg px-6 py-6 rounded-lg flex flex-col gap-4 mb-6">
      {/* Action buttons for editing and deleting the review */}
      <div className="flex justify-between items-center">
        {loggedInUser?.email === review.user.email && <span className="flex gap-4">
          <>
            {/* Trash button to delete review */}
            <button 
              onClick={handleDelete}
              disabled={isPending}
              className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <TrashIcon className="size-5 text-gray-600" />
            </button>

            {/* Pen button to edit review */}
            <button 
              onClick={handleEdit}
              disabled={isPending}
              className="bg-gray-200 p-2 rounded-md cursor-pointer transition-all hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PenIcon className="size-5 text-gray-600" />
            </button>
          </>
        </span>}

        {/* Information showing when the review was edited */}
        <span className="text-sm text-gray-500">
          {review.created_at == review.updated_at || <small className="block">edited...</small>}
          <small>{timeAgo(review.updated_at)}</small>
        </span>
      </div>

      {/* Reviewer's profile and review content */}

      <div className="flex gap-4 items-center">
        {/* Profile picture */}
        <div className="w-[50px] h-[50px] rounded-full relative overflow-hidden border-2 border-gray-200">
          <Image
            src={review.user.profile_picture_url ? `${review.user.profile_picture_url}` : "/profile_pic.jpg"}
            alt="profile_pic"
            className="object-cover rounded-full"
            fill
            sizes="50px"
          />
        </div>

        {/* Review content including name, rating, and review text */}
        <div className="flex flex-col flex-1">
          <p className="font-semibold text-lg text-gray-800">{review.user.first_name} {review.user.last_name}</p>

          <div className="flex gap-1 mt-2">
            {starArray.map((star) => (
              <button
                key={star}
                type="button"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                onClick={() => handleRate(star)}
                disabled={!isOwner || isPending}
                className="disabled:cursor-not-allowed"
              >
                <Star
                  className={
                    star <= currentRating
                      ? "size-5 fill-black"
                      : "size-5 fill-gray-200 text-gray-300"
                  }
                />
              </button>
            ))}
          </div>

          {/* Review text */}
          <small className="text-gray-600 text-justify leading-6 mt-4 font-medium">
            {review.comment}
          </small>
        </div>
      </div>

      {/* Edit Review Modal */}
      <Modal 
        editMode={true}
        open={showEditModal}
        onOpenChange={setShowEditModal}
      >
        <ReviewForm 
          product={{ id: review.id, slug: "", name: "", description: "", price: 0, image: "", reviews: [], rating: { id: 0, average_rating: 0, total_reviews: 0 }, similar_products: [], poor_review: 0, fair_review: 0, good_review: 0, very_good_review: 0, excellent_review: 0 }}
          loggedInUserEmail={loggedInUser?.email}
          editMode={true}
          existingReview={review}
          onClose={handleCloseEditModal}
          onReviewUpdate={handleReviewUpdate}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        editMode={true}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      >
        <div className="w-full mx-auto bg-white rounded-xl p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <TrashIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delete Review
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this review? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={handleCancelDelete}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmDelete}
                disabled={isPending}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Deleting..." : "Delete Review"}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewCard;

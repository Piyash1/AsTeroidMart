import React from 'react'
import ReviewCard from './ReviewCard'
import { Review } from '@/lib/type'
import { auth } from '@/auth'
import { CollapsibleDemo } from '../uiComponents/Collaps'

const ReviewCardContainer = async ({ reviews }: { reviews: Review[] }) => {

  const session = await auth();
  const user = session?.user;

  return (
    <div className="main-max-width mx-auto padding-x ">

      <CollapsibleDemo reviews={reviews} loggedInUser={user} />


      {/* <h4 className="my-4 font-semibold">{reviews.length < 2 ? 'Review' : 'Reviews'} ({reviews.length})</h4>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} loggedInUser={user} />
      ))} */}
    </div>
  )
}

export default ReviewCardContainer
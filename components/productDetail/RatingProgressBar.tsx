import React from "react";
import { Progress } from "@/components/ui/progress"


interface Props{
    rating: string;
    numRating: number;
    total?: number;

}


const RatingProgressBar = ({rating, numRating, total}: Props) => {
  const percent = total && total > 0 ? Math.round((numRating / total) * 100) : 0;
  const color =
    rating === 'Excellent' ? 'bg-green-600' :
    rating === 'Very Good' ? 'bg-emerald-500' :
    rating === 'Good' ? 'bg-blue-500' :
    rating === 'Fair' ? 'bg-yellow-500' :
    'bg-red-500';
  const track = 'bg-gray-200';
  return (
    <div className="flex items-center gap-4 w-full">
      <small className="w-[140px] text-gray-800 font-medium truncate max-sm:text-[10px] max-sm:w-[100px]">
        {rating}
      </small>

      <div className="flex-1">
      <Progress value={percent} className={`h-2 ${track} rounded-md`} indicatorClassName={color} />
      </div>

      <small className="w-[40px] text-gray-700 font-semibold text-right">{numRating}</small>


    </div>
  );
};

export default RatingProgressBar;

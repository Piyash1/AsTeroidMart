import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Button from "./Button";

const WishlistTooltip = ({ disabled }: { disabled: boolean }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="wish-btn disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={disabled}
        >
          Add to Wishlist
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-bold bg-black text-white p-2 rounded-md">You need to be logged in to add to wishlist</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default WishlistTooltip;

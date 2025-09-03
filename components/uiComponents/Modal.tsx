import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  children: React.ReactNode;
  userHaveReview?: boolean;
  editMode?: boolean;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  addressForm?: boolean;
  isUpdate?: boolean;
}

const Modal = ({ children, userHaveReview = false, editMode = false, trigger, open, onOpenChange, addressForm, isUpdate = false }: Props) => {

  if(userHaveReview && !editMode){
    return null
  }
    
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!editMode && (
        <DialogTrigger asChild>
          {trigger || (
            <button className={addressForm ? "address-btn" : "default-btn max-sm:text-[12px] max-sm:px-4 my-6"}>
              {addressForm 
                ? (isUpdate ? "Update Shipping Address" : "Add Shipping Address")
                : "Click to add a review"
              }
            </button>
          )}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

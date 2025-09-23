import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const ConfirmationDialog = ({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  isDeleting,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}>
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Deleting...
              </>
            ) : (
              <>Delete</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

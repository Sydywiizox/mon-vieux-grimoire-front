import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { WarningDiamondIcon as WarningIcon } from "@phosphor-icons/react";

type AlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "danger" | "default";
};

export default function Alert({
  open,
  onOpenChange,
  title,
  message,
  onConfirm,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  confirmVariant = "default",
}: AlertProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <WarningIcon
                size={32}
                className={
                  confirmVariant === "danger"
                    ? "text-red-500"
                    : "text-amber-500"
                }
              />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="font-serif text-xl font-semibold text-gray-800">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-sm text-gray-600">
                {message}
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              confirmVariant === "danger"
                ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50"
                : "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500/50"
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

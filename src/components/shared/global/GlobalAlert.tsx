import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export function GlobalAlert({
  actionButton,
  cancelAction,
  continueAction,
  subTitle,
  title,
  continueActionClass,
}: {
  actionButton?: ReactNode;
  title?: string | ReactNode;
  subTitle?: string | ReactNode;
  cancelAction?: string | ReactNode;
  continueAction?: string | ReactNode;
  continueActionClass?: string;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {actionButton ? (
          actionButton
        ) : (
          <Button variant="outline">Show Dialog</Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {" "}
            {title ? title : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {subTitle
              ? subTitle
              : "This action cannot be undone. This will permanently delete your account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {cancelAction ? cancelAction : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction className={continueActionClass}>
            {continueAction ? continueAction : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
  
  import { UserInfo } from "./page";
  import { useContext, memo } from "react";
  
  const ConfirmDelete = memo(() => {
    const { isDeleteOpen, setIsDeleteOpen, handleDeleteUser } = useContext(UserInfo);
  
    return (
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete this account and remove its data from the servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  });
  
  export { ConfirmDelete };
  
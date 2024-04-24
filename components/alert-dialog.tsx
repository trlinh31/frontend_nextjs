import React from 'react';
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
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface IConfirmDialog {
  message: string;
  onConfirm: () => void;
  isOpenConfirm: boolean;
  setIsOpenConfirm: (value: boolean) => void;
}

export default function ConfirmDialog({ message, onConfirm, isOpenConfirm, setIsOpenConfirm }: IConfirmDialog) {
  const handleConfirm = () => {
    setIsOpenConfirm(false);
    onConfirm();
  };

  if (!isOpenConfirm) {
    return null;
  }

  return (
    <>
      <AlertDialog open={isOpenConfirm} onOpenChange={setIsOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{message}?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

'use client';
import { receivedTransaction } from '@/api/transaction';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';

interface ConfirmProps {
  isOpen: boolean;
  setOpen: any;
  idTransaction: string;
}

export default function ConfirmDialog({ isOpen, setOpen, idTransaction }: ConfirmProps) {
  const router = useRouter();
  const handleConfirm = async () => {
    const response = await receivedTransaction(idTransaction);
    if (response === 200) {
      setOpen(false);
      router.refresh();
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
            <AlertDialogDescription>Nếu bạn đã nhận được hàng vui lòng nhấn xác nhận!</AlertDialogDescription>
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

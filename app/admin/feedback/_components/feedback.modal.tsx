'use client';
import { DialogContent, DialogHeader, DialogTitle, Dialog } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Feedback } from '@/types/feedback.type';
import Image from 'next/image';

type ModalProps = {
  // feedback: Feedback;
  isOpen: boolean;
  setOpen: any;
};

export default function FeedbackModal({ isOpen, setOpen }: ModalProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle className='text-2xl uppercase pb-4'>Phản hồi đánh giá</DialogTitle>
            <div className='py-4'>
              <Textarea placeholder='Bla bla....' readOnly />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

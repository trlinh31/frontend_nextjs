'use client';

import React, { useState } from 'react';
import Rating from 'react-rating';
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
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import Cookies from 'js-cookie';
import { decodeToken } from '@/utils/sessionToken';
import { createRating } from '@/api/feedback';
import { Router } from 'lucide-react';

interface RatingProps {
  isOpen: boolean;
  setOpen: any;
  idProduct: string;
}

export default function RatingComponent({ isOpen, setOpen, idProduct }: RatingProps) {
  const { toast } = useToast();
  const route = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const token = Cookies.get('accessToken') ?? '';
  const decodedToken = decodeToken(token) ?? '';

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast({
        variant: 'destructive',
        description: 'Vui lòng đánh giá cho sản phẩm',
      });
      return;
    }
    const data = {
      comment,
      rating,
      product: {
        id: idProduct,
      },
      customer: {
        username: decodedToken.sub,
      },
    };

    const res = await createRating(data);
    if (res === 200) {
      toast({
        description: 'Đánh giá sản phẩm thành công',
      });
      route.refresh();
    }
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className='uppercase'>Đánh giá sản phẩm</AlertDialogTitle>
          </AlertDialogHeader>
          <div className='space-y-4'>
            <Rating
              initialRating={rating}
              onChange={handleRatingChange}
              emptySymbol={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-star'>
                  <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                </svg>
              }
              fullSymbol={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='yellow'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-star text-yellow-300'>
                  <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                </svg>
              }
            />
            <Textarea rows={4} className='resize-none' placeholder='Nội dung' onChange={handleCommentChange} />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Xác nhận</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

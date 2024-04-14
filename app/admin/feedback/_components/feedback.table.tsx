'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product.type';
import { MoreHorizontal, Star } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import Link from 'next/link';
import { URL_CREATE_PRODUCT, URL_UPDATE_PRODUCT } from '@/constants/url';
import { useState } from 'react';
import { deleteProduct } from '@/api/product';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { Category } from '@/types/category.type';
import Badge from '@/components/badge';
import StarRating from '@/components/star-rating';
import FeedbackModal from '@/app/admin/feedback/_components/feedback.modal';

// type ProductPropType = {
//   products: Product[] | [];
//   pagination: {
//     currentPage: number;
//     totalPage: number;
//   };
// };

const tableHeader = ['STT', 'Điểm đánh giá', 'Nội dung đánh giá', 'Trả lời', 'Thời gian', 'Trạng thái', ''];

export default function FeedbackTable() {
  // const { toast } = useToast();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // const { currentPage, totalPage } = pagination;

  // const handleDeleteProduct = async (id: string) => {
  //   try {
  //     await deleteProduct(id);
  //     toast({
  //       description: 'Xoá sản phẩm thành công',
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     toast({
  //       description: 'Xoá sản phẩm thất bại',
  //     });
  //   }
  // };

  const handleShowModal = () => {
    setOpenModal(!isOpenModal);
  };

  return (
    <>
      <Table className='border'>
        <TableHeader className='bg-green-500'>
          <TableRow>
            {tableHeader.map((item, index) => (
              <TableHead key={index} className='text-center text-white'>
                {item}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='text-center'>
          <TableRow>
            <TableCell className='font-medium'>1</TableCell>
            <TableCell>
              <StarRating rating={3} />
            </TableCell>
            <TableCell>Bla bla</TableCell>
            <TableCell>Bla bla</TableCell>
            <TableCell>19/4/2023 14:25</TableCell>
            <TableCell>Hiển thị</TableCell>
            <TableCell className='w-[100px]'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DropdownMenuItem onClick={handleShowModal}>Phản hồi</DropdownMenuItem>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <FeedbackModal isOpen={isOpenModal} setOpen={setOpenModal} />
      {/* <PaginationSection totalPage={totalPage} currentPage={currentPage} /> */}
    </>
  );
}

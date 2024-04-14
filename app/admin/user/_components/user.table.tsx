'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product.type';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { URL_CREATE_USER } from '@/constants/url';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { Button } from '@/components/ui/button';

type ProductPropType = {
  products: Product[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const tableHeader = ['STT', 'Họ tên', 'Email', 'Số điện thoại', 'Địa chỉ', 'Nhóm', ''];

export default function UserTable() {
  const { toast } = useToast();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  // const { currentPage, totalPage } = pagination;

  const handleShowModal = () => {
    setOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
        <Button asChild>
          <Link href={URL_CREATE_USER}>Thêm mới</Link>
        </Button>
      </div>
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
            <TableCell>Linh Trần</TableCell>
            <TableCell>admin@gmail.com</TableCell>
            <TableCell>0912345678</TableCell>
            <TableCell>Hà Nội</TableCell>
            <TableCell>Quản trị viên</TableCell>
            <TableCell className='w-[100px]'>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <DropdownMenuItem>Cập nhật</DropdownMenuItem>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/* <PaginationSection totalPage={totalPage} currentPage={currentPage} /> */}
    </>
  );
}

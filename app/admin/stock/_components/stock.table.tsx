'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_STOCK } from '@/constants/url';
import PaginationSection from '@/components/pagination';
import { formatPrice } from '@/utils/formatPrice';
import { useState } from 'react';
import { Stock } from '@/types/stock';
import { formatDate } from '@/utils/formatDate';
import StockModal from '@/app/admin/stock/_components/stock.modal';

type propType = {
  stocks: Stock[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const tableHeader = ['STT', 'Mã phiếu', 'Tổng hoá đơn', 'Ngày tạo', ''];

export default function StockTable({ stocks, pagination }: propType) {
  const { currentPage, totalPage } = pagination;
  const [stock, setStock] = useState<Stock | any>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const handleQuickViewTransaction = (stock: Stock) => {
    setStock(stock);
    setOpenModal(!isOpenModal);
  };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
        <Button asChild>
          <Link href={URL_CREATE_STOCK}>Thêm mới</Link>
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
          {stocks?.map((item: Stock, index: number) => (
            <TableRow key={item.id}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{formatPrice(item.billInvoice)}</TableCell>
              <TableCell>{formatDate(item.createdDate)}</TableCell>
              <TableCell className='w-[100px]'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleQuickViewTransaction(item)}>Xem</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationSection totalPage={totalPage} currentPage={currentPage} />
      <StockModal stock={stock} isOpen={isOpenModal} setOpen={setOpenModal} />
    </>
  );
}

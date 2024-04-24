'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_TRANSACTION, URL_UPDATE_TRANSACTION } from '@/constants/url';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { Transaction } from '@/types/transaction.type';
import { formatPrice } from '@/utils/formatPrice';
import { Badge } from '@/components/ui/badge';
import { cancelTransaction, confirmTransaction, deleteTransaction } from '@/api/transaction';
import { useState } from 'react';
import TransactionModal from '@/app/admin/transaction/_components/transaction.modal';
import { Input } from '@/components/ui/input';
import ConfirmDialog from '@/components/alert-dialog';

type propType = {
  transactions: Transaction[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const statusTransaction = (status: number) => {
  switch (status) {
    case 0:
      return <Badge variant={'destructive'}>Đã huỷ</Badge>;
    case 1:
      return <Badge variant={'outline'}>Chờ xác nhận</Badge>;
    case 2:
      return <Badge variant={'secondary'}>Đã xác nhận</Badge>;
    default:
      return <Badge>Đã nhận hàng</Badge>;
  }
};

const tableHeader = ['STT', 'Mã đơn hàng', 'Tên khách hàng', 'Địa chỉ', 'Email', 'Tổng tiền đơn hàng', 'Ghi chú', 'Trạng thái', ''];

export default function TransactionTable({ transactions, pagination }: propType) {
  const { toast } = useToast();
  const router = useRouter();
  const { currentPage, totalPage } = pagination;
  const [transaction, setTransaction] = useState<Transaction | any>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState('');

  const handleQuickViewTransaction = (transaction: any) => {
    setTransaction(transaction);
    setOpenModal(!isOpenModal);
  };

  const handleSubmitSearchForm = (e: any) => {
    e.preventDefault();
    router.push(`?keyword=${searchValue}`);
  };

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <form onSubmit={handleSubmitSearchForm}>
          <div className='flex items-center gap-x-4'>
            <Input placeholder='Nhập mã đơn hàng' className='w-[300px]' onChange={(e) => setSearchValue(e.target.value)} />
            <Button type='submit'>Tìm kiếm</Button>
          </div>
        </form>
        <Button asChild>
          <Link href={URL_CREATE_TRANSACTION}>Thêm mới</Link>
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
          {transactions?.map((item: Transaction, index: number) => (
            <TableRow key={item.id}>
              <TableCell className='font-medium'>{currentPage * 10 + index + 1}</TableCell>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{formatPrice(item.billInvoice)}</TableCell>
              <TableCell>{item.note}</TableCell>
              <TableCell>{statusTransaction(item.status)}</TableCell>
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
      <TransactionModal transaction={transaction} isOpen={isOpenModal} setOpen={setOpenModal} />
    </>
  );
}

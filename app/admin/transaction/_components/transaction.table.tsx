'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_TRANSACTION } from '@/constants/url';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { Transaction } from '@/types/transaction.type';
import { formatPrice } from '@/utils/formatPrice';
import { Badge } from '@/components/ui/badge';
import { cancelTransaction, confirmTransaction, deleteTransaction } from '@/api/transaction';

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
      return <Badge variant={'destructive'}>Huỷ bỏ</Badge>;
    case 1:
      return <Badge variant={'secondary'}>Chờ xác nhận</Badge>;
    default:
      return <Badge>Hoàn thành</Badge>;
  }
};

const tableHeader = ['STT', 'Mã đơn hàng', 'Tên khách hàng', 'Địa chỉ', 'Email', 'Tổng tiền đơn hàng', 'Ghi chú', 'Trạng thái', ''];

export default function TransactionTable({ transactions, pagination }: propType) {
  const { toast } = useToast();
  const router = useRouter();
  const { currentPage, totalPage } = pagination;

  const handleConfirmTransaction = async (id: string) => {
    try {
      const res = await confirmTransaction(id);
      if (res === 200) {
        toast({
          description: 'Xác nhận đơn hàng thành công',
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        description: 'Xác nhận đơn hàng thất bại',
      });
    }
  };

  const handleCancelTransaction = async (id: string) => {
    try {
      const res = await cancelTransaction(id);
      if (res === 200) {
        toast({
          description: 'Huỷ đơn hàng thành công',
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        description: 'Huỷ đơn hàng thất bại',
      });
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const res = await deleteTransaction(id);
      if (res === 200) {
        toast({
          description: 'Xoá đơn hàng thành công',
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast({
        description: 'Xoá đơn hàng thất bại',
      });
    }
  };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
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
              <TableCell className='font-medium'>{index + 1}</TableCell>
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
                    {item.status == 1 && (
                      <>
                        <DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleConfirmTransaction(item.id)}>Xác nhận</DropdownMenuItem>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCancelTransaction(item.id)}>Huỷ</DropdownMenuItem>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    <DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDeleteCustomer(item.id)}>Xoá</DropdownMenuItem>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationSection totalPage={totalPage} currentPage={currentPage} />
    </>
  );
}

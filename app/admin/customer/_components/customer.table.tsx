'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Customer } from '@/types/customer.type';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_CUSTOMER } from '@/constants/url';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { deleteCustomer } from '@/api/customer';

type CustomerPropType = {
  customers: Customer[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const tableHeader = ['STT', 'Tên đăng nhập', 'Họ tên', 'Giới tính', 'Email', 'Địa chỉ', ''];

export default function CustomerTable({ customers, pagination }: CustomerPropType) {
  const { toast } = useToast();
  const router = useRouter();
  const { currentPage, totalPage } = pagination;

  const handleDeleteCustomer = async (id: string) => {
    console.log(id);

    try {
      const res = await deleteCustomer(id);
      console.log('Status', res);

      if (res === 200) {
        toast({
          description: 'Xoá khách hàng thành công',
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast({
        description: 'Xoá khách hàng thất bại',
      });
    }
  };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
        <Button asChild>
          <Link href={URL_CREATE_CUSTOMER}>Thêm mới</Link>
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
          {customers?.map((item: Customer, index: number) => (
            <TableRow key={item.id}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell>{item.username}</TableCell>
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.gender}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell className='w-[100px]'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <DropdownMenuItem>Cập nhật</DropdownMenuItem>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
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

'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Customer } from '@/types/index';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { MoreHorizontal } from 'lucide-react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_CUSTOMER, URL_UPDATE_CUSTOMER } from '@/constants/url';
import { useState } from 'react';
import ImageNotFound from '@/components/image-404';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { deleteU } from '@/api/customer';

type CustomerPropType = {
  customers: Customer[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const productTableHeader = ['Mã sản phẩm', 'Ảnh dại diện', 'Họ tên', 'Email', 'Số điện thoại', 'Địa chỉ', ''];

export default function CustomerTable({ customers, pagination }: CustomerPropType) {
  const { toast } = useToast();
  const [customer, setCustomer] = useState<any>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { currentPage, totalPage } = pagination;

  const handleInputSearchChange = (e: any) => {
    setSearchName(e.target.value);
  };

  const onChangeSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set('q', searchName);
    replace(`${pathname}?${params.toString()}`);
  };

  const handleQuickViewProduct = (customer: any) => {
    setCustomer(customer);
    setOpenModal(!isOpenModal);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await deleteU(id);
      toast({
        description: 'Xoá khách hàng thành công',
      });
    } catch (error) {
      console.log(error);
      toast({
        description: 'Xoá khách hàng thất bại',
      });
    }
  };

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <div className='flex w-full max-w-sm items-center space-x-2'>
          <Input placeholder='Nhập tên khách hàng cần tìm kiếm...' value={searchName} onChange={handleInputSearchChange} />
          <Button type='submit' onClick={onChangeSearch}>
            Tìm kiếm
          </Button>
        </div>
        <Button asChild>
          <Link href={URL_CREATE_CUSTOMER}>Thêm mới</Link>
        </Button>
      </div>
      <ScrollArea className='h-[500px] border'>
        <Table className='border-collapse'>
          <TableHeader className='bg-green-500'>
            <TableRow>
              {productTableHeader.map((item, index) => (
                <TableHead key={index} className='text-center text-white'>
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className='text-center'>
            {customers.map((customer: Customer, index: number) => (
              <TableRow key={index}>
                <TableCell className='font-medium w-[120px]'>{customer.id}</TableCell>
                <TableCell>
                  <div className='w-[50px] h-[50px] mx-auto rounded-full overflow-hidden'>
                    {customer.avatar ? (
                      <Image
                        src={customer.avatar}
                        className='w-full h-full object-cover'
                        width={100}
                        height={200}
                        loading='lazy'
                        alt={customer.name}
                        quality={100}
                      />
                    ) : (
                      <ImageNotFound />
                    )}
                  </div>
                </TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell className='w-[300px]'>
                  <div className='line-clamp-2'>{customer.email}</div>
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell className='w-[100px]'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Xem</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={URL_UPDATE_CUSTOMER + customer.id}>Cập nhật</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteUser(customer.id)}>Xoá</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <PaginationSection totalPage={totalPage} currentPage={currentPage} />
      {/* <ProductModal product={product} isOpen={isOpenModal} setOpen={setOpenModal} /> */}
    </>
  );
}

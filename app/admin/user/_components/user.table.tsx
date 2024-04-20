'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { URL_CREATE_USER, URL_UPDATE_USER } from '@/constants/url';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user.type';
import { Badge } from '@/components/ui/badge';
import { Role } from '@/types/role.type';
import { useRouter } from 'next/navigation';

type propType = {
  users: User[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const tableHeader = ['STT', 'Tên đăng nhập', 'Họ tên', 'Email', 'Địa chỉ', 'Nhóm', 'Vai trò', ''];

export default function UserTable({ users, pagination }: propType) {
  const { toast } = useToast();
  const router = useRouter();
  const { currentPage, totalPage } = pagination;

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
          {users?.map((user: User, index: number) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.group && <Badge>{user.group?.name}</Badge>}</TableCell>
              <TableCell className='max-w-[300px]'>
                {user.group && (
                  <div className='flex flex-wrap items-center gap-2'>
                    {user.group.roles.map((item: Role) => (
                      <Badge key={item.id} variant={'outline'}>
                        {item.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </TableCell>
              <TableCell className='w-[100px]'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={URL_UPDATE_USER + user.id}>Cập nhật</Link>
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

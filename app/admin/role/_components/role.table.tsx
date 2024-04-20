'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_ROLE, URL_UPDATE_ROLE } from '@/constants/url';
import { useToast } from '@/components/ui/use-toast';
import { MoreHorizontal } from 'lucide-react';
import { Role } from '@/types/role.type';

type RolePropType = {
  roles: Role[] | [];
};

const tableHeader = ['STT', 'Mã vai trò', 'Tên vai trò', ''];

export default function RoleTable({ roles }: RolePropType) {
  const { toast } = useToast();
  const router = useRouter();

  // const handleDeleteCategory = async (id: string) => {
  //   try {
  //     const res = await deleteCategory(id);
  //     if (res === 200) {
  //       toast({
  //         description: 'Xoá danh mục thành công',
  //       });
  //       router.refresh();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast({
  //       description: 'Xoá danh mục thất bại',
  //     });
  //   }
  // };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
        <Button asChild>
          <Link href={URL_CREATE_ROLE}>Thêm mới</Link>
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
          {roles?.map((role: Role, index: number) => (
            <TableRow key={role.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{role.code}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell className='w-[100px]'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={URL_UPDATE_ROLE + role.id}>Cập nhật</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Xoá</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

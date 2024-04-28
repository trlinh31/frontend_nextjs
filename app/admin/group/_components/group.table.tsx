'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_GROUP, URL_UPDATE_GROUP } from '@/constants/url';
import { useToast } from '@/components/ui/use-toast';
import { MoreHorizontal } from 'lucide-react';
import { Group } from '@/types/group.type';
import { Badge } from '@/components/ui/badge';
import { Role } from '@/types/role.type';
import { deleteGroup } from '@/api/group';

type propType = {
  groups: Group[] | [];
};

const tableHeader = ['STT', 'Mã nhóm', 'Tên nhóm', 'Nhóm vai trò', ''];

export default function GroupTable({ groups }: propType) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDeleteGroup = async (id: string) => {
    const res = await deleteGroup(id);
    if (res !== 200) {
      toast({
        variant: 'destructive',
        description: 'Xoá nhóm tài khoản thất bại',
      });
      return;
    }
    toast({
      description: 'Xoá nhóm tài khoản thành công',
    });
  };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
        <Button asChild>
          <Link href={URL_CREATE_GROUP}>Thêm mới</Link>
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
          {groups?.map((group: Group, index: number) => (
            <TableRow key={group.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{group.code}</TableCell>
              <TableCell>{group.name}</TableCell>
              <TableCell className='w-[400px]'>
                <div className='flex flex-wrap gap-2'>
                  {group.roles.map((item: Role) => (
                    <Badge key={item.id}>{item.name}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className='w-[100px]'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={URL_UPDATE_GROUP + group.id}>Cập nhật</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteGroup(group.id)}>Xoá</DropdownMenuItem>
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

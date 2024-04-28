'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_CATEGORY, URL_UPDATE_CATEGORY } from '@/constants/url';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import { Category } from '@/types/category.type';
import { MoreHorizontal } from 'lucide-react';
import { deleteCategory } from '@/api/category';

type CategoryPropType = {
  categories: Category[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const productTableHeader = ['STT', 'Mã danh mục', 'Tên danh mục', 'Mã danh mục cha', 'Danh mục cha', ''];

export default function CategoryTable({ categories, pagination }: CategoryPropType) {
  const { toast } = useToast();
  const { currentPage, totalPage } = pagination;
  const router = useRouter();

  const handleDeleteCategory = async (id: string) => {
    const res = await deleteCategory(id);
    if (res !== 200) {
      toast({
        variant: 'destructive',
        description: 'Xoá danh mục thất bại',
      });
      return;
    }
    toast({
      description: 'Xoá danh mục thành công',
    });
  };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
        <Button asChild>
          <Link href={URL_CREATE_CATEGORY}>Thêm mới</Link>
        </Button>
      </div>
      <Table className='border'>
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
          {categories?.map((category: Category, index: number) => (
            <TableRow key={category.id}>
              <TableCell>{currentPage * 10 + index + 1}</TableCell>
              <TableCell>{category.code}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.parentsCategory?.code}</TableCell>
              <TableCell>{category.parentsCategory?.name}</TableCell>
              <TableCell className='w-[100px]'>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreHorizontal />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <Link href={URL_UPDATE_CATEGORY + category.id}>Cập nhật</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteCategory(category.id)}>Xoá</DropdownMenuItem>
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

'use client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Product } from '@/types/product.type';
import { MoreHorizontal } from 'lucide-react';
import { formatPrice } from '@/utils/formatPrice';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { URL_CREATE_PRODUCT, URL_UPDATE_PRODUCT } from '@/constants/url';
import { useState } from 'react';
import ImageNotFound from '@/components/image-404';
import { deleteProduct } from '@/api/product';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import ProductModal from '@/app/admin/product/_components/product.modal';
import { Category } from '@/types/category.type';

type ProductPropType = {
  products: Product[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const tableHeader = ['STT', 'Mã sản phẩm', 'Ảnh sản phẩm', 'Tên sản phẩm', 'Mô tả', 'Giá nhập', 'Đơn giá', 'Số lượng', 'Nhóm sản phẩm', ''];

export default function ProductTable({ products, pagination }: ProductPropType) {
  const { toast } = useToast();
  const router = useRouter();
  const [product, setProduct] = useState<any>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { currentPage, totalPage } = pagination;

  const handleQuickViewProduct = (product: any) => {
    setProduct(product);
    setOpenModal(!isOpenModal);
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await deleteProduct(id);
      if (res === 200) {
        toast({
          description: 'Xoá sản phẩm thành công',
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast({
        description: 'Xoá sản phẩm thất bại',
      });
    }
  };

  return (
    <>
      <div className='flex items-center justify-end mb-8'>
        <Button asChild>
          <Link href={URL_CREATE_PRODUCT}>Thêm mới</Link>
        </Button>
      </div>
      <ScrollArea className='h-[50vh] border'>
        <Table>
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
            {products?.map((product: Product, index: number) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.code}</TableCell>
                <TableCell>
                  <div className='w-[100px] h-[100px] mx-auto'>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={'/' + product.images[0].name}
                        className='w-full h-full object-cover'
                        width={100}
                        height={200}
                        loading='lazy'
                        alt={product.name}
                      />
                    ) : (
                      <ImageNotFound />
                    )}
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>
                  <div className='line-clamp-2'>{product.description}</div>
                </TableCell>
                <TableCell>{formatPrice(product.importPrice)}</TableCell>
                <TableCell>{formatPrice(product.price)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell className='space-x-1'>
                  {product.categories.map((category: Category, index: number) => {
                    return (
                      <span key={index}>
                        {category.name} {index !== product.categories.length - 1 && ','}
                      </span>
                    );
                  })}
                </TableCell>
                <TableCell className='w-[100px]'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleQuickViewProduct(product)}>Xem</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={URL_UPDATE_PRODUCT + product.id}>Cập nhật</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)}>Xoá</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <PaginationSection totalPage={totalPage} currentPage={currentPage} />
      <ProductModal product={product} isOpen={isOpenModal} setOpen={setOpenModal} />
    </>
  );
}

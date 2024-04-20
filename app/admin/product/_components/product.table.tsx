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
import { useEffect, useState } from 'react';
import ImageNotFound from '@/components/image-404';
import { deleteProduct } from '@/api/product';
import { useToast } from '@/components/ui/use-toast';
import PaginationSection from '@/components/pagination';
import ProductModal from '@/app/admin/product/_components/product.modal';
import { Category } from '@/types/category.type';
import Badge from '@/components/badge';
import { getProductFeedbacks } from '@/api/feedback';

type propType = {
  products: Product[] | [];
  pagination: {
    currentPage: number;
    totalPage: number;
  };
};

const tableHeader = [
  'STT',
  'Mã sản phẩm',
  'Ảnh sản phẩm',
  'Tên sản phẩm',
  'Mô tả',
  'Giá nhập',
  'Đơn giá',
  'Số lượng',
  'Nhóm sản phẩm',
  'Tình trạng',
  '',
];

export default function ProductTable({ products, pagination }: propType) {
  const { toast } = useToast();
  const router = useRouter();
  const [product, setProduct] = useState<any>();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { currentPage, totalPage } = pagination;
  const [typeModal, setTypeModal] = useState<string>('detail');

  useEffect(() => {
    const checkProductIsOutIsStock = products.some((item: Product) => item.quantity === 0);
    if (checkProductIsOutIsStock) {
      toast({
        variant: 'destructive',
        title: 'Thông báo',
        description: 'Một số sản phẩm đã hết hàng! Vui lòng nhập hàng mới',
      });
    }
  }, []);

  const handleQuickViewProduct = (product: any) => {
    setTypeModal('detail');
    setProduct(product);
    setOpenModal(!isOpenModal);
  };

  const handleQuickViewProductFeedback = async (id: string) => {
    const { data } = await getProductFeedbacks(id);
    if (!data) {
      return;
    }
    setTypeModal('feedbacks');
    setProduct(data);
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
      <ScrollArea className='h-[55vh] border'>
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
                <TableCell>
                  {product.quantity > 0 ? <Badge status={true} content='Còn hàng' /> : <Badge status={false} content='Hết hàng' />}
                </TableCell>
                <TableCell className='w-[100px]'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleQuickViewProduct(product)}>Xem</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleQuickViewProductFeedback(product.id)}>Xem đánh giá</DropdownMenuItem>
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
      <ProductModal data={product} isOpen={isOpenModal} setOpen={setOpenModal} type={typeModal} />
    </>
  );
}

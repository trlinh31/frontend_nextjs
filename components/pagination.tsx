import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  totalPage: number;
  currentPage: number;
};

export default function PaginationSection({ totalPage, currentPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onChangePagination = (page: any) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className='w-full mt-6'>
      <Pagination className='flex justify-end'>
        <PaginationContent>
          {Array(totalPage)
            .fill(0)
            .map((item, index: number) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    className='cursor-pointer'
                    isActive={currentPage === index ? true : false}
                    onClick={() => onChangePagination(index)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
        </PaginationContent>
      </Pagination>
    </div>
  );
}

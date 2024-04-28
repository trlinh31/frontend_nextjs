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

  const handleFirstPage = () => {
    onChangePagination(0);
  };

  const handleLastPage = () => {
    onChangePagination(totalPage - 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      onChangePagination(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPage - 1) {
      onChangePagination(currentPage + 1);
    }
  };

  return (
    <div className='w-full mt-6'>
      <Pagination className='flex justify-end'>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink className='cursor-pointer' onClick={handleFirstPage}>
              First
            </PaginationLink>
          </PaginationItem>
          <PaginationPrevious onClick={handlePrevPage} className={`${currentPage === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`} />
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
          <PaginationNext onClick={handleNextPage} className={`${currentPage === totalPage - 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`} />
          <PaginationItem>
            <PaginationLink className='cursor-pointer' onClick={handleLastPage}>
              Last
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

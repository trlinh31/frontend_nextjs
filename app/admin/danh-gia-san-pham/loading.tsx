import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Loading() {
  return (
    <>
      <Table className='border'>
        <TableHeader>
          <TableRow>
            {Array(5)
              .fill(0)
              .map((item, index) => (
                <TableHead key={index}>
                  <Skeleton className='h-4 w-[150px] mx-auto' />
                </TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(3)
            .fill(0)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton key={index} className='h-4 w-[100px] mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton key={index} className='w-[100px] h-[100px] mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton key={index} className='h-6 w-[100px] mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton key={index} className='h-6 w-[100px] mx-auto' />
                </TableCell>
                <TableCell>
                  <Skeleton key={index} className='h-6 w-[100px] mx-auto' />
                </TableCell>
                {/* <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.supplier}</TableCell> */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}

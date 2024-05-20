import { formatPrice } from '@/utils/formatPrice';

export default function OrderItem({ transaction }: { transaction: any }) {
  return (
    <>
      <div className='w-full grid grid-cols-12 gap-x-4'>
        <div className='col-span-2'>
          <img
            src={'/' + transaction.product.images[0]?.name}
            className='object-contain object-top'
            width={200}
            height={300}
            alt={transaction.product.name}
          />
        </div>
        <div className='col-span-10 space-y-6'>
          <h1 className='font-bold text-3xl'>{transaction.product.name}</h1>
          <p>Số lượng: {transaction.quantity}</p>
          <p>Giá: {formatPrice(transaction.total)}</p>
        </div>
      </div>
    </>
  );
}

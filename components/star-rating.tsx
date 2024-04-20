export default function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      // Nếu sao hiện tại là sao được đánh giá, thêm class "gold"
      stars.push(
        <span key={i} className='gold text-sm'>
          &#9733;
        </span>
      );
    } else {
      stars.unshift(
        <span key={i} className='text-sm'>
          &#9733;
        </span>
      );
    }
  }

  return <div className='star-rating'>{stars}</div>;
}

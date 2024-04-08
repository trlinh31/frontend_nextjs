import Image from 'next/image';
import React from 'react';

export default function ImageNotFound() {
  return (
    <>
      <Image
        src={'https://developers.google.com/static/maps/documentation/streetview/images/error-image-generic.png'}
        className='w-full h-full object-cover'
        width={100}
        height={200}
        loading='lazy'
        alt='Not Found'
        quality={100}
      />
    </>
  );
}

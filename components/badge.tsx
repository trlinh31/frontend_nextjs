import React from 'react';

type BadgePropType = {
  status: boolean;
  content: string;
};

export default function Badge({ status, content }: BadgePropType) {
  return <div className={`${status ? 'bg-green-600' : 'bg-red-600'} text-white py-2 px-4 shadow-lg rounded-xl`}>{content}</div>;
}

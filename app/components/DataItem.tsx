import React from 'react'

type DataItemProps = {
    title: string;
    value: string;
}

export default function DataItem({ title, value }: DataItemProps) {
  return (
    <div className="sm:flex-1 text-center sm:text-left px-4">
    <h4 className="text-[0.6rem] sm:font-semibold tracking-widest text-gray-500">{title}</h4>
    <p className="text-[1.2rem] sm:text-[1rem] font-semibold text-gray-800">{value}</p>
  </div>
  )
}

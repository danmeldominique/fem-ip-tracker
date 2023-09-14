import React from 'react'

type DataItemProps = {
    title: string;
    value: string;
}

export default function DataItem({ title, value }: DataItemProps) {
  return (
    <div className="data-item sm:flex-1">
    <h4 className="data-item-title">{title}</h4>
    <p className="data-item-value">{value}</p>
  </div>
  )
}

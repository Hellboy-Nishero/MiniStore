import React from 'react'
import { Star } from "lucide-react"

const Stars = ({rating}) => {
  return (
    <div className='stars'>
            {
        [...Array(5)].map((_, index) => (
            <Star
            key={index}
            size={17}
            stroke={`${index < rating ? "none" : "currentColor"}`}
            strokeWidth={1}
            className={`star ${index < rating ? "filled" : ""}`} />
        )
    )
    }
    </div>

  )
}

export default Stars
'use client'

import Image from 'next/image'
import React from 'react'

const Card = ({
    front,
    matched
}: {
    front: string
    matched: boolean
}) => {

    const [flipped, setFlipped] = React.useState(false)

    const handleCardFlip = () => {
      setFlipped(!flipped)
    }

    return (
        <div className={`card ${flipped || matched ? 'flipped' : ''}`}>
            <div className="front w-full h-full p-2 grid place-items-center">
                <Image src={front} alt="card" width={60} height={60} objectFit='cover'  />
            </div>
            <div className="back bg-gray-300 w-full h-full p-2" onClick={handleCardFlip}></div>
        </div>
    )
}

export default Card
'use client'

import React from 'react'

const Card = ({
    front,
    back,
}: {
    front: string
    back: string
}) => {

    const [flipped, setFlipped] = React.useState(false)

    const handleCardFlip = () => {
      setFlipped(!flipped)
    }

    return (
        <div className={`p-5 grid place-items-center bg-gray-300 m-1 card ${flipped ? 'flipped' : ''}`}>
            <div className="front">{front}</div>
            <div className="back" onClick={handleCardFlip}>{back}</div>
        </div>
    )
}

export default Card
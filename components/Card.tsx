'use client'

import Image from 'next/image'
import React from 'react'

const Card = ({
    card,
    front,
    flipped,
    disabled,
    handleChoice
}: {
    card: any
    front: string
    flipped: boolean,
    disabled: boolean,
    handleChoice: (card: any) => void
}) => {


    const handleCardFlip = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }

    return (
        <div className={`card ${flipped ? 'flipped' : ''}`}>
            <div className="front w-full h-full p-2 grid place-items-center">
                <Image src={front} alt="card" width={60} height={60} style={{ objectFit: 'cover' }} />
            </div>
            <div className="back bg-gray-300 w-full h-full p-2" onClick={handleCardFlip}></div>
        </div>
    )
}

export default Card
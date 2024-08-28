'use client'

import Card from '@/components/Card'
import React from 'react'

const Home = () => {

  return (
    <main>
      <section className='py-10'>
        <div className='container mx-auto'>
          <h1 className='text-4xl font-light text-center mb-8'>Flip Game</h1>
          <div className="grid grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <Card
                key={index}
                front={(index + 1).toString()}
                back='Back'
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
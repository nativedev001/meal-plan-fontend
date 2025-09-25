import Image from 'next/image'
import React from 'react'

const Main = () => {
    return (
        <div className='flex flex-row h-screen w-full bg-purple-500 '>
            <div className='py-10 px-20 w-1/2 flex flex-col justify-center items-start gap-5'>
                <h1 className='text-6xl text-white primaryFont'>
                    Plan Smart, Eat Better.
                </h1>
                <span className='text-white mt-4 secondaryFont text-lg'>
                    Take the stress out of meal planning. Our smart meal planner helps you choose the right meals, track your nutrition, and save time in the kitchen. Whether you’re looking for healthy options, quick recipes, or customized plans, we make eating well simple and enjoyable
                </span>
            </div>
            <div className='flex items-center justify-center w-1/2'>
             <Image src="/meal.png" alt='mainimage' width={400} height={200} className='rounded-full' />
            </div>
        </div>
    )
}

export default Main
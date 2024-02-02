import React from 'react'

const Header = () => {
  return (
    <div className='flex h-20 bg-gray-300 '>
        <div className='flex items-center justify-between w-full'>
            <div className='flex text-3xl font-bold p-2'>
                Payments App
            </div>
            <div className='p-3 m-2'>Hello,User</div>
        </div>
    </div>
  )
}

export default Header

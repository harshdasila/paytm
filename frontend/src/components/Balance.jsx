import React from 'react'
import { useUser } from '../hooks/userUser';

const Balance = ({balance}) => {
  const user = useUser();
  
  return (
    <div className='text-2xl p-2 mt-2'>
      {`Your balance is ${balance}` }
    </div>
  )
}

export default Balance

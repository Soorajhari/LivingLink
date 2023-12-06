import React from 'react'

interface propstype{
 error:string
}


const Error = (props:propstype) => {
  return (
    <div className='flex justify-center mt-5 '>
        <div className='bg-red-500 w-full h-[50px] text-center shadow-2xl  '>
          <h1 className='text-xl mt-3 font-semibold'>{props.error}<br/> </h1> 
        </div>
    </div>
  )
}

export default Error
import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='hidden md:block font-[Ubuntu]'>
        <ul className='flex justify-center gap-x-3  items-center mt-4 text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">About</a></li>
            <li className='px-2'> <a href="#/">Contact LivingLink</a></li>
            <li className='px-2'> <a href="#/">Help Center</a></li>
        </ul>
        <ul className='flex  justify-center gap-x-3 items-center mt-2 text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">Advertising</a></li>
            <li className='px-2'> <a href="#/">Refund/Cancellation</a></li>
            
        </ul>
        <ul className='flex  justify-center gap-x-3 items-center mt-2  text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">Privacy & Terms</a></li>
            <li className='px-2'> <a href="#/">Ad Choices</a></li>
            
        </ul>

       
        <ul className='flex  justify-center gap-x-3 items-center mt-2 text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">Get the LivingLink App</a></li>
            <li className='px-2'> <a href="#/">More</a></li>
            
        </ul>

        {/* <h3 className=' flex justify-center mt-3 text-xl tracking-tight'><span>LivingLink</span> Coorporation  2023</h3>
         */}

         <div className='flex space-x-3 text-xl justify-center mt-2 '>
            <h3 className='font-semibold text-[#3981b6]'>Living<span className='text-[#1AACAC]'>Link</span> </h3>
            <p>Corporation</p>
            <p>2023</p>
         </div>
    </div>




    <div className='block md:hidden'>
        <ul className='flex justify-center gap-x-3  items-center mt-4 text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">About</a></li>
            <li className='px-2'> <a href="#/">Contact LivingLink</a></li>
            <li className='px-2'> <a href="#/">Help Center</a></li>
        </ul>
        <ul className='flex  justify-center gap-x-3 items-center mt-2 text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">Advertising</a></li>
            <li className='px-2'> <a href="#/">Refund/Cancellation</a></li>
            
        </ul>
        <ul className='flex  justify-center gap-x-3 items-center mt-2  text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">Privacy & Terms</a></li>
            <li className='px-2'> <a href="#/">Ad Choices</a></li>
            
        </ul>

       
        <ul className='flex  justify-center gap-x-3 items-center mt-2 text-base font-normal text-gray-500'>
            <li className='px-2'> <a href="#/">Get the LivingLink App</a></li>
            <li className='px-2'> <a href="#/">More</a></li>
            
        </ul>

        {/* <h3 className=' flex justify-center mt-3 text-xl tracking-tight'><span>LivingLink</span> Coorporation  2023</h3>
         */}

         <div className='flex space-x-3 text-xl justify-center mt-2 '>
            <h3 className='font-semibold text-[#3981b6]'>Living<span className='text-[#1AACAC]'>Link</span> </h3>
            <p>Corporation</p>
            <p>2023</p>
         </div>
    </div>
    </>
  )
}

export default Footer
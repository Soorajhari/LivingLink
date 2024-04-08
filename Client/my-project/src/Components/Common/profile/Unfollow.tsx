import { handLeft } from 'ionicons/icons'
import React from 'react'
import { useAppSelector } from '../../../Redux/hook';

interface ModalProps {
    handleUnfollow: (id: string|undefined) => Promise<void>;
    setUnfollow:React.Dispatch<React.SetStateAction<boolean>>;
  }
const Unfollow = ({handleUnfollow,setUnfollow}:ModalProps) => {

    const profileInfo = useAppSelector((state) => state.ProfileData);
    console.log(profileInfo);
    const id = profileInfo.user?._id;

  return (
<div className=''>
<div className='bg-[#ffff] w-[550px] h-[280px] flex justify-center items-center shadow-md rounded-2xl'>
  <div className='flex flex-col  items-center gap-y-5'>
    <div className='flex justify-center items-center'>
      <h3 className='text-2xl'>Unfollow Sooraj Hari ?</h3>
    </div>
    <hr className='border-1 border-gray-400 w-[100%]' />
    <div className='cursor-pointer'>
      <h5 className='text-lg font-bold text-gray-400'>Are you sure you want to unfollow Sooraj Hari ?</h5>
    </div>
    <hr className='border-1 border-gray-400 w-[100%]' />
    <div className='text-lg text-red-500 font-bold cursor-pointer transition duration-300 ease-in-out hover:text-red-700 ' onClick={() => handleUnfollow(id)}>
  <h5>Unfollow</h5>
</div>
    <hr className='border-1 border-gray-400 w-[100%]' />
    <div  className=' cursor-pointer hover:font-semibold'>
      <h5 onClick={()=>setUnfollow(false)} className='text-lg'>Cancel</h5>
    </div>
  </div>
</div>
    </div>

  )
}

export default Unfollow
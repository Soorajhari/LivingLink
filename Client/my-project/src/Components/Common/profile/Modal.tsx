import React, { SetStateAction,useState ,useRef,MouseEvent,ChangeEvent} from 'react'
interface ModalProps {
    setClick: React.Dispatch<React.SetStateAction<boolean>>;
    onFileChange: (file: File) => void;
  }
 
const Modal = ({setClick,onFileChange}:ModalProps) => {
  
        const fileInputRef = useRef<HTMLInputElement>(null);
       
      
        const handleButtonClick = (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault()
          fileInputRef.current?.click();
        };
      
        const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              onFileChange(selectedFile); 
            }
          };
  return (
    <div className='bg-gray-100 w-full h-full'>
<div className='bg-[#dad0d0] w-[550px] h-[280px] shadow-md flex justify-center items-center rounded-2xl '>
  <div className='flex flex-col  items-center gap-y-5'>
    <div className='flex justify-center items-center'>
      <h3 className='text-2xl'>Change Profile Photo</h3>
    </div>
    <hr className='border-1 border-gray-400 w-[100%]' />
    <div className='cursor-pointer'>
      <h5 className='text-lg font-bold text-blue-700' onClick={(e)=>handleButtonClick(e)}>Upload Photo</h5>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange} accept=".jpg, .jpeg, .png"  name="file"
      />
    </div>
    <hr className='border-1 border-gray-400 w-[100%]' />
    <div className='text-lg text-amber-900 font-bold cursor-pointer'>
      <h5>Remove Current Photo</h5>
    </div>
    <hr className='border-1 border-gray-400 w-[100%]' />
    <div onClick={()=>setClick(false)} className=' cursor-pointer'>
      <h5 className='text-lg'>Cancel</h5>
    </div>
  </div>
</div>
    </div>

  
  )
}

export default Modal
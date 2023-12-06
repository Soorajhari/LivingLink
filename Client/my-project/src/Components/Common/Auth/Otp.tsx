import React, { useState } from 'react';
import './otp.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
// import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../Redux/hook';
const OTPForm = () => {
  const userInfo = useAppSelector((state) => state.authSlice.userInfo);
  console.log(userInfo)
    const [error,setError]=useState("")
  const [otp, setOtp] = useState(Array(6).fill(''));
  const navigate=useNavigate()

  const handleChange = (element:any, index:any) => {
    if (isNaN(element.value))
     return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const body={
    Otp:otp
  }

  const handleSubmit=async(e:any)=>{
    e.preventDefault()
    try{ const response= await axios.post("http://localhost:4000/otp",body)
    if(response.data.status==="ok"){
       navigate("/login")
    }else{
  setError(response.data.message)
    }

}
  catch(error){
    console.log(error)
  }
  }


  const email=userInfo.email

  console.log(email)
  const handleReSubmit=async(e:any)=>{
    e.preventDefault()
    try{ const response= await axios.post("http://localhost:4000/resend_otp",{email:email})
    if(response.data.status==="ok"){
       navigate("/otp")
    }else{
  setError(response.data.message)
    }

}
  catch(error){
    console.log(error)
  }
  }




  console.log(error)
  return (
    <>
    {error &&
<Error error={error} />
}
    {/* <form className="otp-form mt-5" name="otp-form" > */}
    <div>

   
      <div className="title">
        <h3>OTP VERIFICATION -<span className='text-[#3981b6]'>Living<span className='text-[#1AACAC]'>Link</span></span></h3>
        <p className="info mt-3  ">An OTP has been sent to your registered email </p>
        <p className="msg mt-3 p-2">Please enter OTP to verify</p>
      </div>
      <div className="otp-input-fields">
        {otp.map((data, index) => {
          return (
            <input
              key={index}
              className={`otp__digit otp__field__${index + 1}`}
              name="otp"
              type="tel"
              maxLength={1}
              value={data}
              onChange={e => handleChange(e.target, index)}
            />
          );
        })}
      </div>

      <div className="result flex gap-5 justify-around font-semibold">
        <button type='submit' onClick={(e)=>handleReSubmit(e)} className=" p-3 rounded-2xl bg-red-500" >
          Resend OTP
        </button>
        <div  >
        <button type='submit' onClick={(e)=>handleSubmit(e)} className=" rounded-2xl p-3 bg-[#3981b6] text-white">
          Verify OTP
        </button>
        </div>
       
      </div>
      </div>
    {/* </form> */}
    </>
  );
};

export default OTPForm;

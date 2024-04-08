import React, { useEffect, useRef, useState } from "react";
import profile from "../../Assets/images/IMG_20221212_195813_456.jpg";
import { IonIcon } from "@ionic/react";
import { alertCircleOutline, locateOutline, sendOutline, videocamOutline } from "ionicons/icons";
import instance from "../../../Utils/axios";
import { useAppSelector } from "../../../Redux/hook";
import {io} from 'socket.io-client'
import InputEmoji from 'react-input-emoji'



const Message = () => {
  // let socket = useRef()
  // const user = useAppSelector((state) => state.authLogin.userLogin);
  const Data= localStorage.getItem("userDetails") || "";
  const user= JSON.parse(Data);
  console.log(user)
  // console.log(user)
  const socket = io('http://localhost:4000');
  const [chats,setChats]=useState([])
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  // console.log(newMessage)
console.log(user.id)
  useEffect(()=>{
  const getChats=async()=>{
   try{
  const response=await instance.get(`/chat/${user.id}`)
  console.log(response)
   setChats(response.data)
  }catch(error){
   console.log(error.message)
   }
  }
  getChats()
   },[])



  // Connect to Socket.io
  useEffect(() => {
    socket.emit("new-user-add", user.id);
    socket.on("get-users",(users) => {
      setOnlineUsers(users);
    });
  }, [user]);


    // Send Message to socket server
    useEffect(() => {
      if (sendMessage!==null) {
        socket.emit("send-message", sendMessage);}
    }, [sendMessage]);
  
  
    // Get the message from socket server
    useEffect(() => {
      socket.on("recieve-message", (data) => {
        console.log(data)
        setReceivedMessage(data);
      }
  
      );
    }, []);



    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }
   
  // Send Message
  const handleClick = async(e)=> {
    e.preventDefault()
    const message = {
      senderId : user.id,
      text: newMessage,
      chatId: chats._id,
  }
  // const receiverId = chats.member.find((id)=>id!==user.id);
  // send message to socket server
  // setSendMessage({...message, receiverId})
  // send message to database
  try {
    const  response = await instance.post("/message",message);
    console.log(response)
    setMessages([...messages, response.data]);
    console.log(messages)
    setNewMessage("");
  }
  catch
  {
    console.log("error")
  }
}




  return (
    <div className="  shadow-sm w-full  flex">
      <div className="w-[500px] h-full bg-[#ffff]  p-4 ">
        <div className="p-4 border border-r-4">
          <h3 className="font-bold text-2xl">Sooraj Hari</h3>
          <p className="py-5 px-3">Messages</p>
          <hr className="border border-gray-500" />
        </div>

        <div className="space-y-4 overflow-y-scroll ">
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-6 p-2">
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={profile}
              alt="img"
            />
            <div>
              <p className="text-lg font-medium">Sooraj hari</p>
              <div className="flex gap-x-3">
                <p className="mt-2">soooraj sent an attachment</p>
                <p className="mt-2">. 5 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ffff] w-[1500px] ">
        <div className="border border-gray-400 flex justify-between p-5 mt-4 items-center">
        <div className="flex gap-x-3">
        <img
              className="w-[60px] h-[60px] rounded-full"
              src={profile}
              alt="img"
            />
        <h5 className="mt-4 text-xl font-semibold">Sooraj Hrai</h5>

        </div>
        <div className="text-[40px] space-x-5">
        <IonIcon icon={videocamOutline}></IonIcon>
          <IonIcon icon={alertCircleOutline}></IonIcon>
          
        </div>
        </div>

     <div class="flex mt-6">

  <div>
    <img class="w-[45px] h-[45px] rounded-full" src={profile} alt="img" />
  </div>
  <div class="message-container bg-gray-400 rounded-full w-[500px] h-12 flex items-center p-3 text-lg ml-5">
    <p>Hi how are you</p>
  </div>
</div>




<div class="flex mt-6 justify-end">
  <div class="message-container bg-gray-400 rounded-full w-[500px] h-12 flex items-center p-3 text-lg right">
    <p>Hi how are you</p>
  </div>

</div>


<div class="flex mt-6">

  <div>
    <img class="w-[45px] h-[45px] rounded-full" src={profile} alt="img" />
  </div>
  <div class="message-container bg-gray-400 rounded-full w-[500px] h-12 flex items-center p-3 text-lg ml-5">
    <p>Hi how are you</p>
  </div>
</div>

<div class="flex mt-6 justify-end">
  <div class="message-container bg-gray-400 rounded-full w-[500px] h-12 flex items-center p-3 text-lg right">
    <p>Hi how are you</p>
  </div>

</div>


    <div className="border border-gray-200 ] flex">
      <InputEmoji type="text" placeholder="message..."  value={newMessage} onChange={handleChange} className="border border-none h-[75px] rounded-full w-[700px] outline-none" />
      <div className="text-2xl mt-3 cursor-pointer">
       <IonIcon  onClick={handleClick} icon={sendOutline}></IonIcon>
      </div>
      </div> 
      </div>
     </div>
  );
};

export default Message;

import React, { MouseEventHandler, useEffect, useRef, useState } from "react";
import profile from "../../Assets/images/IMG_20221212_195813_456.jpg";
import { IonIcon } from "@ionic/react";
import {
  alertCircleOutline,
  chatbubbleEllipsesOutline,
  checkmarkDoneOutline,
  locateOutline,
  radioButtonOnOutline,
  sendOutline,
  videocamOutline,
} from "ionicons/icons";
import instance from "../../../Utils/axios";
import { useAppSelector } from "../../../Redux/hook";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";
import { format } from "timeago.js";

const Message = () => {
  const scroll = useRef();
  const socket = io("http://localhost:4000");
  const [chats, setChats] = useState([]);
  const [getchats, setGetChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [singleMessage, setsingleMessage] = useState([]);
  const [chatId, setChatId] = useState(null);

  console.log(getchats)

  const userDataJSON = localStorage.getItem("userDetails");
  const userData = userDataJSON ? JSON.parse(userDataJSON) : null;
  // console.log(chats);
  console.log(chatId);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await instance.get(`/get-message?q=${userData.id}`);
        console.log(response.data.chat);
        setGetChats(response.data.chat);
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [userData.id]);

  // Connect to Socket.io
  useEffect(() => {
    // socket.current= io("http://localhost:4000");
    socket.emit("new-user-add", userData.id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userData.id]);

  console.log(onlineUsers);
  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.on("recieve-message", (data) => {
      console.log(data);
      // setsingleMessage(data)
      setReceivedMessage(data);
    });
  }, []);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [singleMessage]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Send Message
  const handleClick = async (e) => {
    e.preventDefault();
    const message = {
      senderId: userData.id,
      text: newMessage,
      chatId: chatId._id,
    };
    const receiverId = chatId.member.find((id) => id != userData.id);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to database
    try {
      const { data } = await instance.post("/message", message);
      // console.log(response)
      setsingleMessage([...singleMessage, data]);
      console.log(messages);
      setNewMessage("");
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await instance.get(`/all-message?q=${chatId._id}`);
        setsingleMessage(response.data.chat);
        console.log(response.data.chat);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMessages();
  }, [chatId]);

  const handleMessage = async (reciverId) => {
    try {
      const currentReceiverId = localStorage.getItem("reciverId");
      if (currentReceiverId !== reciverId) {
        // Remove the current receiverId from local storage
        localStorage.removeItem("reciverId");
        // Store the new receiverId in local storage
        localStorage.setItem("reciverId", reciverId);
      }
      const response = await instance.get(
        `/single-message?q=${reciverId}&senderId=${userData.id}`
      );
      console.log(response.data.chat);
      setsingleMessage(response.data.allMessages);
      setChatId(response.data.chat);
    } catch (error) {
      console.log(error);
    }
  };
  const reciverId = localStorage.getItem("reciverId");
  console.log(reciverId);

  useEffect(() => {
    const fetchData = async (reciverId) => {
      const response = await instance.get(
        `/single-message?q=${reciverId}&senderId=${userData.id}`
      );
      console.log(response.data.chat);
      setsingleMessage(response.data.allMessages);
      setChatId(response.data.chat);
    };
    fetchData(reciverId);
  }, []);

  // console.log(receivedMessage.userId)
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null) {
      setsingleMessage([...singleMessage, receivedMessage]);
    }
  }, [receivedMessage]);

  const checkOnlineStatus = () => {
    const online = onlineUsers.filter((user) => user.userId !== userData.id);
    return online;
  };
  
  const boo = checkOnlineStatus();
  console.log(boo)
  

useEffect(()=>{
const fetchData= async (reciverId)=>{
  const response=await instance.post("/last-message",{reciverId:reciverId})
  console.log(response.data)
}
 fetchData(reciverId)
},[])





  return (
    <div className="  shadow-sm w-full h-screen font-[Ubuntu] flex">
      <div
        className="w-[500px] h-full bg-[#ffff]  p-4   "
        style={{ position: "sticky", top: "0" }}
      >
        <div className="p-4 border border-r-4 ">
          <h3 className="font-bold text-2xl">
            {userData.firstName}
            {userData.lastName}
          </h3>
          <p className="py-5 px-3">Messages</p>
          <hr className="border border-gray-500" />
        </div>
        {getchats.map((item) => (
          <div
            className="space-y-4  cursor-pointer"
            key={item._id}
            ref={scroll}
          >
            <div className="flex gap-x-6 p-2">
              <img
                className="w-[70px] h-[70px] rounded-full"
                src={
                  item.profileImage
                    ? `http://localhost:4000/${item.profileImage.replace(
                        "src\\public\\",
                        ""
                      )}`
                    : require("../../Assets/images/150-1503945_transparent-user-png-default-user-image-png-png.png")
                }
                alt="img"
              />
              <div
                onClick={() => {
                  handleMessage(item._id);
                }}
              >
                <div className="flex  gap-x-3 mt-3">
                <p className="text-lg font-medium">
                  {item.firstName} {item.lastName}
                </p>
                {
  boo.map((list) => (
    // Check the condition and return the appropriate JSX element
    list.userId === item._id ? (
      <IonIcon className="text-green-500" icon={radioButtonOnOutline}></IonIcon>
    ) : (
      // Return null or an empty string if the condition is not met
      null
    )
  ))
}

            
                </div>
            
                
                <div className="flex gap-x-3">
                  <p className="mt-2">soooraj sent an attachment</p>
                  <p className="mt-2">. 5 days</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {singleMessage.length === 0 && (
  <div className={`flex flex-col justify-center items-center w-[1300px] ${singleMessage.length==0 ? 'visible' : ' hidden'}`}>
    <IonIcon className="mx-auto text-[140px]" icon={chatbubbleEllipsesOutline}></IonIcon>
    <h4 className="font-meduim p-2 text-3xl">Your Messages</h4>
    <p className="font-base text-lg p-2">Send private photos and messages to a friend or group.</p>
  </div>
)}
    



       <div className={`bg-[#ffff] w-[1500px] font-[Ubuntu] ${singleMessage.length==0 ? 'hidden' : ' visible'}`}>
        {getchats.map((item) => (
          item._id==localStorage.getItem('reciverId') ?
          <div className="border border-gray-400 flex justify-between p-5 mt-4 items-center">
            <div className="flex gap-x-3">
              <img
                className="w-[70px] h-[70px] rounded-full p-1"
                src={
                  item.profileImage
                    ? `http://localhost:4000/${item.profileImage.replace(
                        "src\\public\\",
                        ""
                      )}`
                    : require("../../Assets/images/150-1503945_transparent-user-png-default-user-image-png-png.png")
                }
                alt="img"
              />
              <h5 className="mt-4 text-xl font-semibold">
                {item.firstName} {item.lastName}
              </h5>
            </div>
            <div className="text-[40px] space-x-5">
              <IonIcon icon={videocamOutline}></IonIcon>
              <IonIcon icon={alertCircleOutline}></IonIcon>
            </div>
          </div> : null
        ))}
 







{singleMessage.length
          ? singleMessage.map((item) => (
              <div
                ref={scroll}
                className={`flex mt-6 ${
                  userData.id === item.senderId
                    ? "justify-end"
                    : "justify-start"
                }`}
                key={item.id || Math.random().toString()}
              >
                <div
                  className={` ${
                    userData.id === item.senderId
                      ? "bg-blue-500 text-white font-medium   rounded-2xl"
                      : "bg-gray-200 text-black font-medium  rounded-2xl"
                  } message-container p-3 text-lg  rounded-3xl`}
                >
                  <p
                    className={` ${
                      userData.id === item.senderId
                        ? "items-center justify-center"
                        : "items-center justify-center"
                    } "inline-block "
                    `}
                    style={{ minWidth: "100px", minHeight: "30px" }}
                  >
                    
                    {item.text}
                  
                    
    
                  </p>
                  <p
                    className={`text-xs  ${
                      userData.id === item.senderId ? "text-end" : "text-start"
                    } `}
                  >
                    {format(item.createdAt)}
                    {userData.id===item.senderId?
                    <IonIcon className="text-gary-600  space-x-10 text-base" icon={checkmarkDoneOutline}></IonIcon>:""
}
                  </p>
                </div>
              </div>
            ))
          : getchats.map((item) =>
              item._id === localStorage.getItem("reciverId") ? (
                <div
                  key={item._id}
                  className="flex flex-col items-center h-[700px] justify-center p-3  overflow-y-hidden"
                >
                  <img
                    className="w-[90px] h[90px] rounded-full p-1"
                    src={
                      item.profileImage
                        ? `http://localhost:4000/${item.profileImage.replace(
                            "src\\public\\",
                            ""
                          )}`
                        : require("../../Assets/images/150-1503945_transparent-user-png-default-user-image-png-png.png")
                    }
                    alt="img"
                  />
                  <h4 className="font-bold text-2xl p-1.5">
                    {item.firstName}{" "}
                  </h4>
                  <p className="font-light text-gray-500 p-0.6">
                    {item.firstName} {item.lastName}. Living Link
                  </p>

                  <div className=" ">
                    <button className=" m-2 p-2 rounded-2xl font-semibold w-[130px] h-[50px] shadow-xl bg-gray-200">
                      View Profie
                    </button>
                  </div>
                </div>
              ) : null
            )}
 
 { singleMessage.length ?
       <div className="border border-gray-200 ] flex  mb-4 mr-4">
          <InputEmoji
            type="text"
            placeholder="message..."
            value={newMessage}
            onChange={handleChange}
            className="border border-none h-[75px] rounded-full w-[700px] outline-none "
          />
          <div
            className={`text-2xl mt-3 cursor-pointer p-2 ${
              newMessage ? "text-blue-500 " : " cursor-not-allowed"
            }`}
          >
            <IonIcon
              onClick={newMessage ? handleClick : null}
              icon={sendOutline}
            ></IonIcon>
          </div>
        </div> : null

}
      </div> 
    </div>
          
  );
};

export default Message;

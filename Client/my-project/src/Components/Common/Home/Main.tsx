import React, { useState, useEffect } from "react";
import Minipro from "./Minipro";
import Sidemenu from "./Sidemenu";
import Footer from "./Footer";
import Location from "../Auth/Location";
import { IonIcon } from "@ionic/react";
import { color, motion } from "framer-motion";
import {
  shareSocialOutline,
  heartOutline,
  ellipsisHorizontal,
  chatbubbleOutline,
  sendOutline,
} from "ionicons/icons";
import CPost from "../post/CPost";
import instance from "../../../Utils/axios";
import { postData } from "../../../Routes/routes";
import Comment from "./Comment";
import EmojiPicker from "emoji-picker-react";
interface MainProps {
  post: boolean;
  setPost: React.Dispatch<React.SetStateAction<boolean>>;
}

interface UserData {
  id?: string;
}

interface CommentState {
  [postId: string]: string;
}

interface GetComment {
  [itemId: string]: Comment;
}
const Main = (props: MainProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDesktop, setDesktop] = useState(window.innerWidth < 768);
  const [isData, setData] = useState<any[]>([]);
  const [likes, setLikes] = useState<any[]>([]);
  const [firstlikes, setfirstLikes] = useState<any>();
  const [comment, setComment] = useState<CommentState>({});
  const [getComment, setgetComment] = useState<any>({});
  const [openBoxItemId, setOpenBoxItemId] = useState<string | null>(null);
  // const [text, setText] = useState('');

  // const handleEmojiSelect = emoji => {
  //   setText(prevText => prevText + emoji.native);
  // };

  const updateScreenSize = () => {
    setDesktop(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await instance.get(postData);
      // console.log(response.data.Data);
      setData(response.data.Data);
    };
    fetchData();
  }, []);

  const userDataJSON = localStorage.getItem("userDetails");
  const userData: UserData | null = userDataJSON
    ? JSON.parse(userDataJSON)
    : null;

  const handleLike = async (itemId: string) => {
    try {
      const response = await instance.post("/likes", {
        userId: userData?.id,
        postId: itemId,
      });
      console.log(response.data.Post);
      setIsLiked((prev) => !prev);
      setfirstLikes(response.data.Post);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      const response = await instance.get("/likes-count");
      // console.log(response.data.Data);
      setLikes(response.data.Data);
    };
    fetchLikes();
  }, [firstlikes]);

  const handleCommentChange = (postId: string, value: any) => {
    setComment((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  const handleComment = async (itemId: string) => {
    try {
      const comments = comment[itemId];
      if (!comments) {
        console.error(`No comments found for item with ID: ${itemId}`);
        return;
      }
      const response = await instance.post("/comment", {
        comment: comments,
        id: itemId,
        userId: userData?.id,
      });
      console.log(response.data.post);

      setgetComment((prev: GetComment) => ({
        ...prev,
        [itemId]: {
          ...prev[itemId],
          ...response.data.post,
        },
      }));

      setComment((prev) => ({
        ...prev,
        [itemId]: "",
      }));

      console.log(getComment[itemId]);
    } catch (error) {
      console.error(error);
    }
  };

 
const handleGet=async(itemId:string)=>{
try{
setOpenBoxItemId(itemId)
const response=await instance.get(`/get-comment?q=${itemId}`)
console.log(response.data)
setgetComment((prev: GetComment) => ({
  ...prev,
  [itemId]: {
    ...prev[itemId],
    ...response.data.post,
  },
}));
}catch(error){
  console.log(error)
}
}

console.log(getComment);


  return (
    <>
      {props.post && <CPost {...props} setData={setData} />}
      <div
        className={` ${
          props.post ? "blur-sm" : "bg-custom-gray "
        }  font-[Ubuntu]`}
      >
        <Location />
        <main className=" h-full flex justify-center w-full relative">
          <Minipro />

          <div className=" w-full md:w-[65%] space-y-9  lg:w-[42%]  h-full  shadow-lg mt-80 md:mt-10 rounded-2xl mr:0 md:mr-4 ">
            {isData.map((item) => (
              <div
                className={` ${
                  props.post ? "overflow-hidden" : ""
                }     bg-[#ffff]  `}
              >
                <div className=" ">
                  <div className="flex gap-x-1   p-4 ">
                    <div className="flex ">
                      <img
                        className="rounded-full w-[65px]  h-[65px] shrink-0"
                        src={require("../../Assets/images/IMG_20221212_195813_456.jpg")}
                        alt="profile"
                      />
                    </div>

                    <div className="mt-3 ">
                      <h5 className="text-xl font-semibold px-4">
                        {item.user.firstName}
                      </h5>
                      <div className="flex gap-2 px-4">
                        <p className="text-gray-500 font-semibold">
                          {item.user.subrole
                            ? item.user.subrole
                            : item.user.role}
                        </p>
                        <p>Alappuzha</p>
                      </div>
                    </div>
                    <div className="text-right px-2 grow">
                      <IonIcon
                        className="w-[30px] h-[40px] "
                        icon={ellipsisHorizontal}
                      ></IonIcon>
                    </div>
                  </div>

                  <>
                    <div className="" key={item._id}>
                      {item?.Url.includes(".mp4") ? (
                        <video
                          className="w-full h-[500px] md:h-[550px] lg:h-[600px] mt-5 object-contain"
                          controls
                        >
                          <source src={item?.Url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          className="w-full h-[500px] md:h-[550px] lg:h-[600px] mt-5 object-contain"
                          src={item?.Url}
                          alt="home"
                        />
                      )}
                    </div>

                    <div className=" ">
                      <div className=" w-[93%] mx-auto flex  items-center py-4 gap-x-10">
                        <div className="flex gap-1">
                          {/* <IonIcon
                        className="w-[30px] h-[30px] cursor-pointer hover:text-gray-300"
                        icon={heartOutline} onClick={()=>handleLike(item._id)}
                      ></IonIcon> */}
                          <motion.div
                            className="love-icon "
                            onClick={() => handleLike(item._id)}
                            style={{
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                            }}
                            whileHover={{ scale: 1.3 }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="28"
                              height="28"
                            >
                              <path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                              />
                              <motion.path
                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"
                                fill={
                                  isLiked && item.likes.length ? "red" : "white"
                                }
                                strokeWidth="0"
                              />
                            </svg>
                            <div className=" space-x-1">
                              {likes.map((list) => (
                                <p className="text-xl">
                                  {list?._id == item?._id ? list?.count : ""}
                                </p>
                              ))}
                            </div>
                          </motion.div>
                        </div>

                        <div className="flex gap-9">
                          <IonIcon
                            className="w-[30px] h-[30px] cursor-pointer "
                            icon={chatbubbleOutline}
                            onClick={() => handleGet(item._id)}
                          ></IonIcon>
                        </div>
                        <div className="flex gap-9">
                          <IonIcon
                            className="w-[30px] h-[30px] "
                            icon={shareSocialOutline}
                          ></IonIcon>
                        </div>

                        <div className="grow flex justify-end md:gap-x-6 gap-x-4">
                          <div className="border-2 border-black rounded-full md:px-5 px-3 py-0.5">
                            <button className=" text-black bg-white md:text-base text-xs font-meduim">
                              See Similar
                            </button>
                          </div>
                          <div className="border-2 border-white bg-black md:px-7 px-4 md:py-0.5  rounded-full">
                            <button className="text-white bg-black">
                              save
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* } */}

                      <p className="p-3">{item?.text}</p>
                    </div>
                    {openBoxItemId === item._id && (
                      <div className="bg-[#ffff] min-h-[100px] w-[100%] relative">
                        <div className="flex gap-x-5">
                          <textarea
                            className=" shadow-lg mt-4 w-[80%]  rounded-full p-2 outline-none ml-[5rem]"
                            placeholder="Add a Comment"
                            value={comment[item._id] || ""}
                            onChange={(e) =>
                              handleCommentChange(item._id, e.target.value)
                            }
                          ></textarea>

                          <IonIcon
                            className={`w-[30px] h-[40px] mt-6  ${
                              comment
                                ? "text-[#3981b6] cursor-pointer"
                                : " cursor-not-allowed text-gray-300"
                            }  `}
                            icon={sendOutline}
                            onClick={() => handleComment(item?._id)}
                          ></IonIcon>
                        </div>
                        {Object.keys(getComment).map((itemId) => {
                          // Checking if the itemId matches the item._id
                          if (itemId === item._id) {
                            return (
                              <div key={itemId}>
                                {Array.isArray(getComment[itemId]?.comments) &&
                                  getComment[itemId].comments.map(
                                    (comment: any) => (
                                      <div
                                        className="flex justify-between mt-8"
                                        key={comment._id}
                                      >
                                        <div className="p-2">
                                          <img
                                            src={`http://localhost:4000/${comment.user.profileImage.replace(
                                              "src\\public\\",
                                              ""
                                            )}`}
                                            className="w-[50px] h-[50px] rounded-full"
                                            alt="img"
                                          />
                                        </div>
                                        <div className="bg-gray-300 w-[85%] mr-3 p-2 mb-4 rounded-xl shadow-md">
                                          <h4 className="font-semibold text-lg">
                                            {comment.user.firstName} {comment.user.lastName}
                                          </h4>
                                          <h5 className="font-light text-sm">
                                            {comment.user.role}
                                          </h5>
                                          <p className="mt-3">
                                            {comment.content}
                                          </p>{" "}
                                          {/* Accessing the content field */}
                                        </div>
                                      </div>
                                    )
                                  )}
                              </div>
                            );
                          } else {
                            return null; // Return null if the itemId doesn't match item._id
                          }
                        })}
                      </div>
                    )}
                  </>
                </div>
              </div>
            ))}
          </div>
          <Sidemenu />
        </main>
        {isDesktop && <Footer />}
      </div>
    </>
  );
};

export default Main;

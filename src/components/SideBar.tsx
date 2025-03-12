import React from "react";
import { FaUser } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { PiChatsFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/user";

interface TwitterlayoutProps {
  children: React.ReactNode;
}

const SideBar: React.FC<TwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  const sideItems = [
    {
      name: "Home",
      path: "/",
      icon: <IoHome />,
    },
    {
      name: "Profile",
      path: `/profile/${user?.id}`,
      icon: <FaUser />,
    },
    {
      name: "Chats",
      path: "./",
      icon: <PiChatsFill />,
    },
    {
      name: "Notifications",
      path: "./",
      icon: <IoIosNotifications />,
    },
  ];
  return (
    <>
      <div className="flex">
        <div className="max-sm:hidden w-[20%]  h-screen border-gray-200  border-r-[1px] flex flex-col pl-6 gap-4 pt-10">
          {sideItems.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate(item.path);
                }}
                key={index}
                className="flex  items-center gap-2 text-lg font-semibold hover:bg-blue-50 py-[10px] px-[20px] w-fit rounded-full  "
              >
                {item.icon}
                {item.name}
              </div>
            );
          })}
        </div>
        <div className="sm:w-[55%] w-[100%]">{props.children}</div>
        <div className="max-sm:hidden w-[25%] h-screen border-l-[1px] border-gray-200"></div>
      </div>
      <div className="sm:hidden border-t-[1px] border-gray-100  fixed bottom-0 h-[70px] w-[100%] bg-white flex items-center justify-between px-5 ">
        {sideItems.map((item) => (
          <div
            onClick={() => {
              navigate(item.path);
            }}
            className=" text-3xl"
          >
            {item.icon}
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBar;

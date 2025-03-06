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
    <div className="flex">
      <div className="w-[20%]  h-screen border-gray-200  border-r-[1px] flex flex-col pl-6 gap-4 pt-10">
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
      <div className="w-[55%]">{props.children}</div>
      <div className="w-[25%] h-screen border-l-[1px] border-gray-200"></div>
    </div>
  );
};

export default SideBar;

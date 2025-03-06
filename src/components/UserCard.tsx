import React from "react";

const UserCard = ({ user }) => {
  return (
    <div>
      <div className="flex gap-3 items-center bg-blue-50 p-5 rounded-xl">
        <img
          className="h-[50px] w-[50px] rounded-full"
          src={user.profileImageURL}
          alt="user image"
        />
        <div className="font-semibold text-lg">
          {user.firstName} {user.lastName}
        </div>
      </div>
    </div>
  );
};

export default UserCard;

import { useNavigate } from "react-router-dom";
import { User } from "../gql/graphql";

interface UserType {
  user: User;
}

const UserCard = ({ user }: UserType) => {
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div>
      <div
        onClick={handleUserClick}
        className="flex gap-3 items-center bg-blue-50 p-5 rounded-xl cursor-pointer"
      >
        <img
          className="h-[50px] w-[50px] rounded-full"
          src={user.profileImageURL ?? "/"}
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

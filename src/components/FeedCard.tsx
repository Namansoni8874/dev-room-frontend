import { CiShare2 } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { Tweet } from "../gql/graphql";
import moment from "moment";

interface BLogType {
  blog: Tweet;
}

const FeedCard = ({ blog }: BLogType) => {
  const navigate = useNavigate();

  const handleUserCLick = () => {
    navigate(`/profile/${blog.author?.id}`);
  };

  return (
    <div className="rounded-2xl shadow-lg hover:bg-blue-50 px-[15px] py-[10px]">
      {/* user */}
      <div className="flex items-center gap-3  p-3 border-b-[1px] border-gray-300">
        <div className="h-[50px] w-[50px] rounded-full">
          <img
            className="h-[50px] w-[50px] rounded-full"
            src={blog.author?.profileImageURL ?? "/"}
          />
        </div>
        <div>
          <div
            onClick={handleUserCLick}
            className="font-medium text-lg cursor-pointer"
          >
            {blog.author?.firstName} {blog.author?.lastName}
          </div>
          <div className="text-gray-500">
            {moment(blog.createdAt).fromNow()}
          </div>
        </div>
      </div>
      {/* content */}
      <div className="p-3 text-md">
        <p>{blog.content}</p>
      </div>
      <div>
        <img className="rounded-md" src={blog.imageURL ?? ""} />
      </div>
      {/* reaction */}
      <div className="flex text-2xl justify-start gap-6 py-[10px]">
        <FaRegComment />
        <FcLike />
        <CiShare2 />
      </div>
    </div>
  );
};

export default FeedCard;

import { useCallback, useEffect, useMemo, useState } from "react";
import SideBar from "../components/SideBar";
import { useCurrentUser, useGetUserById } from "../hooks/user";
import { useParams } from "react-router-dom";
import FeedCard from "../components/FeedCard";
import { graphqlClient } from "../client/api";
import { FollowUser, UnFollowUser } from "../graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";
import UserCard from "../components/UserCard";

const Profile = () => {
  const [isFollower, setIsFollower] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { id } = useParams();
  const { user } = useCurrentUser();
  const { userByID, refetch } = useGetUserById(id ?? "");
  const queryClient = useQueryClient();

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  const amIFollowing = useMemo(() => {
    if (!userByID?.id) return false;
    return (
      (user?.following?.findIndex((item) => item?.id == userByID.id) ?? -1) >= 0
    );
  }, [user, userByID]);

  console.log(user);
  const handleFollow = useCallback(async () => {
    if (!userByID?.id) return false;
    try {
      await graphqlClient.request(FollowUser, { to: userByID.id });
      //@ts-ignore

      await queryClient.invalidateQueries(["current-user"]);
    } catch (error) {
      console.log(error);
    }
  }, [userByID, queryClient]);
  const handleUnFollow = useCallback(async () => {
    if (!userByID?.id) return false;
    try {
      await graphqlClient.request(UnFollowUser, { to: userByID.id });
      //@ts-ignore

      await queryClient.invalidateQueries(["current-user"]);
    } catch (error) {
      console.log(error);
    }
  }, [userByID, queryClient]);

  return (
    <div>
      <SideBar>
        {/* user info */}
        <div className="p-[30px]">
          <div className=" flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <img
                className="w-[100px] h-[100px] rounded-full "
                src={userByID?.profileImageURL ?? ""}
              />
              <div className="   text-xl font-semibold">
                {userByID?.firstName} {userByID?.lastName}
              </div>
              <div className="flex gap-3 text-gray-600 cursor-pointer">
                <div
                  onClick={() => {
                    setIsFollower(true);
                  }}
                >
                  {userByID?.followers?.length} Followers
                </div>
                <div
                  onClick={() => {
                    setIsFollowing(true);
                  }}
                >
                  {userByID?.following?.length} Followings
                </div>
              </div>
            </div>
            <div>
              {user?.id !== userByID?.id && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnFollow}
                      className="p-3 bg-blue-200 rounded-full font-semibold"
                    >
                      UnFollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className="p-3 bg-blue-200 rounded-full font-semibold"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="py-[10px] flex gap-8 text-gray-700 border-b-[1px] border-gray-200">
            <div>Posts</div>
            <div>Rooms</div>
            <div>Community</div>
          </div>
          {/* content */}
          <div className="flex flex-col gap-5 pt-5">
            {userByID &&
              userByID.tweets &&
              userByID.tweets.map((item) => {
                //@ts-ignore

                return <FeedCard key={item?.id} blog={item} />;
              })}
          </div>
        </div>
        {/* rendring follow list  */}
        {isFollower && userByID?.followers && (
          <div
            onClick={() => setIsFollower(false)}
            className="fixed inset-0 flex items-center justify-center  h-screen w-full bg-black/50"
          >
            <div className="w-1/2 bg-white h-[80%] rounded-2xl p-3 ">
              <div className="h-full w-full flex flex-col gap-4 overflow-y-scroll p-3">
                {userByID.followers.map((item) => {
                  //@ts-ignore

                  return <UserCard key={item?.id} user={item} />;
                })}
              </div>
            </div>
          </div>
        )}
        {isFollowing && userByID?.following && (
          <div
            onClick={() => setIsFollowing(false)}
            className="fixed inset-0 flex items-center justify-center  h-screen w-full bg-black/50"
          >
            <div className="w-1/2 bg-white h-[80%] rounded-2xl p-3 ">
              <div className="h-full w-full flex flex-col gap-4  overflow-y-scroll p-3">
                {userByID.following &&
                  userByID.following.map((item) => {
                    //@ts-ignore

                    return <UserCard key={item?.id} user={item} />;
                  })}
              </div>
            </div>
          </div>
        )}
      </SideBar>
    </div>
  );
};

export default Profile;

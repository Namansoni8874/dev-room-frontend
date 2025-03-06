import { useCallback } from "react";
import { useCurrentUser } from "../hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { graphqlClient } from "../client/api";
import { VerifyGoogleUser } from "../graphql/query/User";

const Navbar = () => {
  const { user } = useCurrentUser();

  const handleLogin = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential;
    if (!googleToken) throw Error("Invalid credentials");
    const { verifyGoogleToken } = await graphqlClient.request(
      VerifyGoogleUser,
      { token: googleToken }
    );
    if (verifyGoogleToken)
      window.localStorage.setItem("token", verifyGoogleToken);
  }, []);

  return (
    <div className="bg-blue-100 flex justify-between p-3 sticky top-0 ">
      <div className="text-2xl font-medium">DevRoom</div>
      <div>
        <input
          className="border-[1.5px] border-gray-300 w-[200px] rounded-full outline-none p-2 hover:w-[300px] transition-all bg-blue-50"
          placeholder="Search"
        />
      </div>
      <div>
        {!user ? (
          <div className="rounded-full overflow-hidden w-[150px] bg-amber-200">
            <GoogleLogin onSuccess={handleLogin} />
          </div>
        ) : (
          <div className="hover:bg-blue-200 p-3 rounded-full">
            <img
              className="h-[40px] w-[40px] rounded-full"
              src={user.profileImageURL ?? "/"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

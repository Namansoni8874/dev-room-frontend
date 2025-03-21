import { useCallback, useState } from "react";
import SideBar from "../components/SideBar";
import FeedCard from "../components/FeedCard";
import { MdOutlinePostAdd } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { FaImages } from "react-icons/fa";
import { useCreateBlog, useGetAllBlogs } from "../hooks/tweet";
import { storage } from "../client/appwite";
import { ID } from "appwrite";

const Home = () => {
  const [isOpean, setIsOpean] = useState(false);
  const { blogs, isError } = useGetAllBlogs();
  const { mutateAsync } = useCreateBlog();
  const [imageUrl, setImageUrl] = useState("");

  const [content, setContent] = useState<string>("");

  const handleInputChangeFile = useCallback(
    (input: HTMLInputElement) => {
      return async (event: Event) => {
        event.preventDefault();
        const file: File | null | undefined = input.files?.item(0);
        if (!file) return;
        const promise = storage.createFile(
          "67c9dfa3000362186385",
          ID.unique(),
          file
        );
        promise.then(
          function (response) {
            console.log(response);
            const id = response.$id;
            setImageUrl(
              `https://cloud.appwrite.io/v1/storage/buckets/67c9dfa3000362186385/files/${id}/view?project=67c9df760008a58cfb70`
            );
            console.log("imageurl", imageUrl);
          },
          function (error) {
            console.log(error); // Failure
          }
        );
      };
    },
    [imageUrl]
  );

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);

    input.click();
  }, [handleInputChangeFile]);

  const handleOnSubmit = useCallback(() => {
    mutateAsync({
      content,
      imageURL: imageUrl,
    });

    setContent("");
    setIsOpean(false);
  }, [content, mutateAsync, imageUrl]);

  return (
    <div>
      <SideBar>
        <div className="p-3 sm:p-[30px] ">
          {/* adding blog section */}
          <div
            onClick={() => setIsOpean(true)}
            className="flex cursor-pointer items-center text-xl gap-1 hover:bg-blue-100 rounded-full w-fit py-1 px-3 mb-2"
          >
            <MdOutlinePostAdd />
            Add
          </div>
          {isOpean && (
            <div className="fixed inset-0 w-screen h-full bg-black/50  flex items-center justify-center">
              <div className="max-sm:w-[80%] w-1/2  bg-gray-100 rounded-3xl p-10 ">
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-medium">Create Post</div>
                  <RxCross2 onClick={() => setIsOpean(false)} />
                </div>
                <div className="flex flex-col mt-3 gap-5">
                  <input
                    className="outline-none border-[1px] border-gray-300 rounded-full p-2"
                    placeholder="Title"
                  />
                  <textarea
                    rows={4}
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                    className="outline-none border-[1px] border-gray-300 rounded-2xl px-2 pt-4"
                    placeholder="Content"
                  />
                </div>
                {/* upload image section */}
                <div className="flex justify-between p-5">
                  <FaImages onClick={handleSelectImage} className="text-xl  " />
                  <button
                    onClick={handleOnSubmit}
                    className="bg-blue-300 hover:bg-blue-500 py-2 text-xl px-4 rounded-full"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-5 flex-col">
            {blogs ? (
              //@ts-ignore
              blogs.map((item) => <FeedCard key={item?.id} blog={item} />)
            ) : (
              <div>{isError}</div>
            )}
          </div>
        </div>
      </SideBar>
    </div>
  );
};

export default Home;

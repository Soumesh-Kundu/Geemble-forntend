import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { useDailogAtom, ACTIONS as DailogAction } from "../store/DailogStore";
import { usePostAtom, ACTIONS } from "../store/CurrentPost";

export default function PostManagement({
  author,
  caption = "",
  postedImage = "",
  Button_text,
  onSubmit,
}) {
  const [, setCurrentPost] = usePostAtom();
  const location = useLocation();
  const [, setDailog] = useDailogAtom();
  const [postDetails, setPostDeitals] = useState({
    caption,
    uploadImage: postedImage
      ? `http://192.168.0.103:5500/api/${postedImage}`
      : "",
  });
  const fileRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    if (postDetails.caption === "" && postDetails.uploadImage === "") {
      console.log("cant post");
      return;
    }
    onSubmit();
    const formData = new FormData(e.target);
    for (let value of formData.entries()) {
      console.log({ [value[0]]: value[1] });
    }
  }
  function handleFileChange(e) {
    if (e.target.files.length === 0) {
      return;
    }

    const imageURL = URL.createObjectURL(e.target.files[0]);
    setPostDeitals((prev) => {
      return { ...prev, [e.target.name]: imageURL };
    });
  }

  return (
    <div className="bg-[#DDDDDD]  w-full mx-3 lg:mx-0 md:w-4/6 tracking-wide lg:w-2/6 min-h-min p-3 md:p-4 rounded-3xl flex flex-col gap-3">
      <div id="author" className="flex h-14 gap-5 relative items-center">
        <div id="profilepicture">
          <div className="w-10 h-10 rounded-full bg-pink-400"></div>
        </div>
        <div id="username" className="text-[#0E5FC0] text-md flex-grow">
          @{author}
        </div>
        <div
          className="rounded-full hover:bg-slate-300 flex items-center justify-center w-10 h-10 cursor-pointer duration-300"
          onClick={() => {
            setDailog({
              type: DailogAction.SET_DAILOG,
              payload: {
                messege: "Discard changes ?",
                isNotConfirmed: true,
                handleOnYes: () => {
                  setCurrentPost({ type: ACTIONS.CLEAR });
                },
                handleOnNo: () => {},
              },
            });
          }}
        >
          <RxCross1 />
        </div>
      </div>
      <form id="post" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input
          id="caption"
          name="caption"
          value={postDetails.caption}
          className="bg-inherit h-6 w-full text-lg outline-none border-none"
          onChange={(e) => {
            setPostDeitals((prev) => {
              return { ...prev, [e.target.name]: e.target.value };
            });
          }}
          placeholder="Whats on you mind ?"
          autoFocus
        ></input>
        <div
          className={`flex items-center justify-center man-h-[rem] object-cover relative bg-cover bg-center ${
            postDetails.uploadImage === "" ? "border" : "0"
          } border-[rgba(0,0,0,0.5)] rounded-lg`}
        >
          <img
            src={`${postDetails.uploadImage}`}
            className="rounded-xl min-h-[5rem] max-h-[25rem]"
          />
          {postDetails.uploadImage === "" && (
            <label
              htmlFor="postimage"
              className=" absolute cursor-pointer bg-gray-300 px-4 py-3 rounded-lg"
            >
              Upload
            </label>
          )}
          <input
            ref={fileRef}
            type="file"
            name="uploadImage"
            id="postimage"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          {postDetails.uploadImage && location.pathname.includes("create") && (
            <button
              type="button"
              className="absolute right-2 top-2 p-2 bg-gray-500 text-gray-300 hover:bg-slate-500  duration-300 rounded-full"
              onClick={() => {
                fileRef.current.value = "";
                setPostDeitals((prev) => {
                  return { ...prev, uploadImage: "" };
                });
              }}
            >
              <RxCross1 />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-[#0E5FC0] text-white p-2 rounded-lg"
        >
          {Button_text}
        </button>
      </form>
    </div>
  );
}

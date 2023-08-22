"use client";

import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter, redirect } from "next/navigation";
import axios from "axios";
import { useDropzone } from "react-dropzone";

// if (session) {
//   redirect("/?callbackUrl=/login");
// }

function Uploads() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);

  const [tag, setTag] = useState("");
  const [image, setImage] = useState("");
  const [details, setDetails] = useState({
    title: "",
    body: "",
    tag: "",
  });
  const handleTagChange = (e) => {
    setTag(e.target.value.split(",").map((ta) => ta.trim()));
  };

  function convertToBase(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };

    reader.onerror = (error) => {
      console.log("Error", error);
    };
  }

  function sendPost(e) {
    e.preventDefault();

    axios
      .post("api/post", { ...details, tag, image })
      .then(() => toast.success("You Just created a post"))
      .catch(() => toast.error("Something went wrong"));

    router.push("/");
  }

  const onChnageValues = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div>
      <div className="absolute top-0 left-0 flex items-center justify-center right-0 bottom-0 bg-black/75 backdrop-blur-md h-screen">
        <div>
          <div className="bg-gradient-to-tr  w-full p-3 overflow-hidden max-w-6xl mx-auto text-gray-200 rounded-t-lg from-[#139084]  via-[#077d80] to-[#086466]">
            <div className="flex justify-between items-center text-gray-200">
              <h1 className=" py-3 text-base font-BeVietnamProReg">
                Create a Post
              </h1>

              <div className="p-1 border border-gray-300/40 px-3 rounded-xl bg-white/10 w-fit flex gap-2 items-center">
                <Link href={"/"}>
                  <MdOutlineCancel />
                </Link>
              </div>
            </div>
            <div className="w-full bg-gray-300/40 h-[0.8px]" />
            <div className="flex my-2">
              <p className="text-sm font-BeVietnamProReg  py-3 ">
                Post Section
              </p>
              <img className="w-9 h-9" src="/images/secret.webp" alt="" />

              {image && <img className="w-32" src={image} alt="" />}
            </div>
          </div>

          <form
            onSubmit={sendPost}
            className="bg-slate-50 w-full p-3 rounded-b-lg"
          >
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="email">
                Post title
              </label>
              <input
                className="bg-[#0e5e5f] rounded-lg p-2  focus:outline-none"
                name="title"
                value={details.title}
                onChange={onChnageValues}
                type="text"
                placeholder="Yout title"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="password">
                Add Image
              </label>

              <input onChange={convertToBase} type="file" accept="image/*" />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="password">
                Tags
              </label>
              <input
                name="tag"
                value={tag}
                onChange={handleTagChange}
                className="bg-[#0e5e5f] focus:outline-none rounded-lg p-2"
                type="text"
                placeholder="Enter tags seperate with commas"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="password">
                Body
              </label>
              <textarea
                rows="4"
                cols="30"
                name="body"
                value={details.body}
                onChange={onChnageValues}
                className="bg-[#0e5e5f] focus:outline-none rounded-lg p-2"
                type="text"
                placeholder="Enter full text here"
              />
            </div>

            <div className="p-1 border border-gray-300/40 px-6 my-3 w-fit flex gap-2 items-center bg-gradient-to-l  max-w-5xl mx-auto text-gray-200 rounded-lg  from-[#139084]  via-[#077d80] to-[#086466]">
              <button type="submit" className="text-sm ">
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Uploads;

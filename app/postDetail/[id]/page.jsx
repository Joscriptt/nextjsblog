import React from "react";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { BsFillBookmarkFill } from "react-icons/bs";
import Option from "@/app/components/Option";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const singlePost = async (id) => {
  let res = await fetch(`http://localhost:3000/api/post/${id}`);
  return res.json();
};
const getPost = async () => {
  let res = await fetch(`http://localhost:3000/api/post`, {
    cache: "no-store",
  });
  return res.json();
};

async function PostDetails({ params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const { id } = params;
  let data = await singlePost(id);
  let res = await getPost();

  return (
    <div className=" z-10 px-9">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg capitalize  text-pink-700 font-BeVietnamProExtB">
          {data?.tag}
        </p>
        <h1 className="text-5xl my-4 leading-[1.1] font-BeVietnamProExtB  fluid">
          {data?.title}
        </h1>
        <p className="text-base  font-BeVietnamProReg text-[#aaa]">
          {format(parseISO(data?.createdAt), "LLLL d, yyyy")}
        </p>
        <div className="flex justify-center mt-5">
          <Option
            saved={data.saved}
            deletePost={data._id}
            creator={data.creator}
          />
        </div>
        <div className="">
          <img className="my-28 rounded-lg" src={data.image} alt="" />
          <article className="prose max-w-4xl mx-auto p-6  ">
            {data.body}
          </article>

          <div className="bg-gray-200 rounded-2xl my-11 p-8 max-w-md mx-auto">
            <h1 className="text-3xl my-3 font-BeVietnamProExtB">Subscribe</h1>
            <p className="prose">
              Get fresh web design stories, tops, and resources delivered
              straight to your inbox every week
            </p>

            <form className="mt-6 ">
              <input
                className="p-2 rounded-md mr-2 font-BeVietnamProBo"
                type="text"
                placeholder="Your Email"
              />
              <button className="bg-black p-2 rounded-md text-white font-BeVietnamProBo">
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div>
          <h1 className="text-2xl mt-40 font-BeVietnamProExtB">
            Continue Reading
          </h1>

          <div className="mx-auto max-w-4xl px-6 my-56 z-10 relative">
            <div className=" space-y-10">
              {res?.map((post) => (
                <div key={post._id} className="lg:flex gap-4 ">
                  <Link href={`/postDetail/${post._id}`}>
                    <img
                      className="w-full cursor-pointer aspect-video object-cover lg:w-60 lg:h-44 rounded-lg "
                      src={post.image}
                      alt=""
                    />
                  </Link>
                  <div>
                    <div className="flex items-center justify-between lg:px-0   ">
                      <p className="text-xl  my-2 lg:my-0 font-bold font-BeVietnamProMedd text-purple-600">
                        {post.tag}
                      </p>
                      <div className="bg-slate-300 cursor-pointer rounded-full p-2">
                        <BsFillBookmarkFill className="text-gray-400 " />
                      </div>
                    </div>
                    <h1 className="text-xl lg:text-3xl lg:max-w-md my-2  font-BeVietnamProBo text-[#333333] ">
                      {post.title.substring(0, 70)}...
                    </h1>
                    <p className="text-base   font-BeVietnamProReg text-[#aaa]">
                      {format(parseISO(post.createdAt), "LLLL d, yyyy")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;

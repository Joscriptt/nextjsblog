"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import { format, parseISO } from "date-fns";

import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useRouter, redirect } from "next/navigation";
import Link from "next/link";

import { useSession } from "next-auth/react";
import Skeleton from "./components/Skeleton";

function HomePage() {
  const session = useSession({
    onUnauthenticated() {
      redirect("/login?callbackUrl=/");
    },
  });
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    "http://localhost:3000/api/post",
    fetcher
  );

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className="mx-auto max-w-4xl px-6 mt-16 z-10 relative">
      <div className=" space-y-10  ">
        {isLoading
          ? [1, 2, 3, 4].map((load) => (
              <div key={load} className="mx-auto max-w-4xl ">
                <Skeleton />
              </div>
            ))
          : data?.map((post) => (
              <div key={post._id} className="lg:flex gap-4 ">
                <Link href={`postDetail/${post._id}`}>
                  <img
                    className="w-full  cursor-pointer aspect-video object-cover lg:w-60 lg:h-44 rounded-lg "
                    src={post.image}
                    alt=""
                  />
                </Link>
                <div>
                  <div className="flex  items-center justify-between lg:px-0">
                    <div>
                      <p className="text-xl   my-2 lg:my-0 font-bold font-BeVietnamProMedd text-purple-600">
                        {post.tag}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {post.saved.length}

                      <div className=" cursor-pointer rounded-full p-2">
                        {/* <BsFillBookmarkFill className="text-gray-400 " /> */}
                        {post.saved.includes(session?.data?.user.id) ? (
                          <BsHeartFill className="text-red-600 " />
                        ) : (
                          <BsHeart className="text-black  " />
                        )}
                      </div>
                    </div>
                  </div>
                  <h1 className="text-xl lg:text-3xl lg:max-w-md my-2  font-BeVietnamProBo text-[#333333] ">
                    {post.title.substring(0, 70)}...
                  </h1>

                  <p className="text-base   font-BeVietnamProReg text-[#aaa]">
                    {format(parseISO(post?.createdAt), "LLLL d, yyyy")}
                  </p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default HomePage;

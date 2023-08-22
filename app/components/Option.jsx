"use client";
import { BsTrashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

function Option({ deletePost, creator, saved }) {
  const route = useRouter();
  const session = useSession();

  async function handledelete(deletePost) {
    try {
      await fetch(`http://localhost:3000/api/post/${deletePost}`, {
        method: "DELETE",
      });
      route.push("/");
      // mutate();
      toast.success("Post Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  async function upvote() {
    try {
      await fetch(`/api/post/${deletePost}`, {
        method: "PATCH",
        body: JSON.stringify({ userId: session.data.user.id }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="relative w-14">
      <button onClick={upvote} className="hover:bg-purple-700 rounded-lg p-2">
        {saved.length}
        Like
      </button>
      {session?.data?.user?.id === creator && (
        <div className=" bg-slate-100 group  font-BeVietnamProMedd rounded-lg w-56 flex flex-col">
          {/* <button className="hover:bg-slate-200  rounded-lg p-2">Edit</button> */}

          <button
            className="hover:bg-[#28090a] flex justify-center space-x-4 items-center  text-[#f64254]  rounded-lg p-2"
            onClick={() => handledelete(deletePost)}
          >
            <BsTrashFill />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Option;

"use client";

import React from "react";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillGithub,
} from "react-icons/ai";

import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const session = useSession({
    onUnauthenticated() {
      redirect("/login?callbackUrl=/");
    },
  });
  const path = usePathname();

  return (
    <>
      <nav className="flex justify-between mt-4  px-4 relative z-10">
        <Link href={"/"}>
          <h2 className="text-lg text-gray-400">Logo</h2>
        </Link>
        <div className="flex items-center space-x-3">
          <AiFillInstagram className="text-gray-400 cursor-pointer text-2xl" />
          <AiOutlineTwitter className="text-gray-400 cursor-pointer text-2xl" />
          <AiFillGithub className="text-gray-400 cursor-pointer text-2xl" />

          {session.status == "unauthenticated" ? (
            <Link href={"/register"}>
              <button className="text-gray-400 border  p-1 rounded-xl">
                Register
              </button>
            </Link>
          ) : (
            <>
              {session?.data?.user?.image && (
                <img
                  className="w-9 h-9 rounded-full"
                  src={session?.data?.user?.image}
                  alt=""
                />
              )}

              <span className="text-white">{session?.data?.user?.name}</span>
              <Link href={"/uploads"}>
                <button className="text-gray-600 border  p-1 rounded-xl">
                  Upload
                </button>
              </Link>

              <button
                className="text-gray-400 border  p-1 rounded-xl"
                onClick={() => signOut()}
              >
                logout
              </button>
            </>
          )}
        </div>
      </nav>
      <div className=" flex justify-center z-10 relative  ">
        <h1 className="text-5xl mt-20 font-BeVietnamProExtB">
          {path == "/" && "Blog"}
        </h1>
      </div>
    </>
  );
}

export default Header;

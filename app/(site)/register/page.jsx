"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { TbBrandGithubFilled, TbBrandGoogle } from "react-icons/tb";

function Register() {
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    image: session?.data?.user?.image,
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    axios
      .post("api/register", user)
      .then(() => toast.success("User has been register"))
      .catch(() => toast.error("Something went wrong"));

    router.push("/login");
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // console.log(user);
  };

  return (
    <>
      <div className="absolute top-0 left-0 flex items-center justify-center right-0 bottom-0 bg-black/75 backdrop-blur-md h-screen">
        <div>
          <div className="bg-gradient-to-tr p-3 max-w-5xl mx-auto text-gray-200 rounded-t-lg w-96 from-[#139084]  via-[#077d80] to-[#086466]">
            <div className="flex justify-between items-center text-gray-200">
              <h1 className=" py-3 text-base font-BeVietnamProReg">Register</h1>

              <div className="p-1 border border-gray-300/40 px-3 rounded-xl bg-white/10 w-fit flex gap-2 items-center">
                <Link href={"/login"}>
                  <button className="text-sm ">Login</button>
                </Link>
              </div>
            </div>
            <div className="w-full bg-gray-300/40 h-[0.8px]" />
            <div className="flex my-2">
              <p className="text-sm font-BeVietnamProReg  py-3 ">
                Register for an account
              </p>
              <img className="w-9 h-9" src="/images/secret.webp" alt="" />
            </div>

            <div className="flex gap-5  items-center">
              <div className="p-1 border border-gray-300/40 px-3 rounded-xl bg-white/10 w-fit flex gap-2 justify-between items-center">
                <TbBrandGoogle className="text-base" />
                <button className="text-xs " onClick={() => signIn("google")}>
                  Register with Google
                </button>
              </div>
              <div className="p-1 border border-gray-300/40 px-3 rounded-xl bg-white/10 w-fit flex gap-2 items-center">
                <TbBrandGithubFilled className="text-base" />
                <button className="text-xs ">Register with Github</button>
              </div>
            </div>
          </div>

          <form
            onSubmit={registerUser}
            className="bg-slate-50 p-3 rounded-b-lg"
          >
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="email">
                Username
              </label>
              <input
                className="bg-[#0e5e5f] rounded-lg p-2  focus:outline-none"
                name="username"
                value={user.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="bg-[#0e5e5f] rounded-lg p-2  focus:outline-none"
                name="email"
                value={user.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter email address"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2" htmlFor="password">
                password
              </label>
              <input
                name="password"
                value={user.password}
                onChange={handleChange}
                className="bg-[#0e5e5f] focus:outline-none rounded-lg p-2"
                type="password"
                placeholder="Enter email address"
              />
            </div>

            <div className="p-1 border border-gray-300/40 px-6 my-3 w-fit flex gap-2 items-center bg-gradient-to-l  max-w-5xl mx-auto text-gray-200 rounded-lg  from-[#139084]  via-[#077d80] to-[#086466]">
              <button className="text-sm ">Register</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;

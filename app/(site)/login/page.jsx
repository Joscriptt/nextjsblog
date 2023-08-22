"use client";

import React, { useEffect, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { MdOutlineCancel } from "react-icons/md";
import { TbBrandGoogle } from "react-icons/tb";
import { toast } from "react-hot-toast";
import Link from "next/link";

function Login() {
  const session = useSession();
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
    if (session.status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, router]);

  const registerUser = async (e) => {
    e.preventDefault();
    signIn("credentials", { ...user, redirect: false }).then((callback) => {
      if (callback?.error) {
        toast.error(callback.error);
      }

      if (callback?.ok && !callback?.error) {
        toast.success("Logged in successfully");
      }
    });
  };

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="">
      {/* <div className="bg-red-600 p-4 space-y-4 rounded-md max-w-lg w-72 h-fit ">
        <form onSubmit={registerUser}>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              className="bg-[#F1F3F5] rounded-md"
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter user name"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              className="bg-[#F1F3F5] rounded-md"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>
          <div>

          <button> Login with credentials</button>
          </div>
        </form>
      </div> */}
      {/* <button onClick={() => signIn("google")}>Google </button> */}

      {/* <button onClick={() => signOut()}>Sign out</button> */}

      <div>
        <div className="absolute top-0 left-0 flex items-center justify-center right-0 bottom-0 bg-black/75 backdrop-blur-md h-screen">
          <div>
            <div className="bg-gradient-to-tr p-3 max-w-5xl mx-auto text-gray-200 rounded-t-lg w-96 from-[#139084]  via-[#077d80] to-[#086466]">
              <div className="flex justify-between items-center text-gray-200">
                <h1 className=" py-3 text-base font-BeVietnamProReg">Login</h1>

                <div className="p-1 border border-gray-300/40 px-3 rounded-xl bg-white/10 w-fit flex gap-2 items-center">
                  <Link href={"/register"}>
                    <button className="text-sm ">Register</button>
                  </Link>
                </div>
              </div>
              <div className="w-full bg-gray-300/40 h-[0.8px]" />
              <div className="flex my-2">
                <p className="text-sm font-BeVietnamProReg  py-3 ">
                  Enter your login details
                </p>
                <img className="w-9 h-9" src="/images/secret.webp" alt="" />
              </div>
              <div className="p-1 border border-gray-300/40 px-3 rounded-xl bg-white/10 w-fit flex gap-2 items-center">
                <TbBrandGoogle className="text-base" />
                <button className="text-sm ">Login with Google</button>
              </div>
            </div>

            <form
              onSubmit={registerUser}
              className="bg-slate-50 p-3 rounded-b-lg"
            >
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
                  placeholder="Enter password"
                />
              </div>

              <div className="p-1 border border-gray-300/40 px-6 my-3 w-fit flex gap-2 items-center bg-gradient-to-l  max-w-5xl mx-auto text-gray-200 rounded-lg  from-[#139084]  via-[#077d80] to-[#086466]">
                <button className="text-sm ">Log in</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

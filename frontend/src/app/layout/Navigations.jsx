"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navItem } from "../data/app";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { IoSearchSharp } from "react-icons/io5";
import { useRouter, useSearchParams } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import CreatePostModal from "../Components/CreatePostModal";
import { deleteCookie } from "cookies-next";
import { GrMenu } from "react-icons/gr";
import { useApolloClient } from "@apollo/client";

const Navigations = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const client = useApolloClient();
  const path = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (!query) {
      router.replace("/", undefined, { shallow: true });
      return;
    }
    router.push(`/?query=${query}`);
  };
  return (
    <>
      <div className="fixed z-[200]">
        <CreatePostModal
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>
      {/* top bar */}
      <div className={`w-full fixed top-0 z-40`}>
        <div className="flex md:hidden overflow-clip px-4  z-40 top-0 h-[65px] w-full bg-[#fff]  justify-between items-center gap-y-3 md:px-8">
          <img
            src="/logo.png"
            alt="logo"
            className="rounded-md py-2 px-1 object-cover h-[50px]"
          />
          <form
            action=""
            onSubmit={handleClick}
            className="relative flex items-center bg-red-700"
          >
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              className="h-[40px]  rounded border border-[#e6ebf3] outline-none text-base pl-2 block md:hidden pr-9"
              style={{ width: "calc(100vw - 150px)" }}
            />
            <button className="absolute right-3" type="submit">
              <IoSearchSharp size={20} color="#1a1a1a" />
            </button>
          </form>

          <button
            className="cursor-pointer"
            onClick={() => setShowSidebar(() => true)}
          >
            <GrMenu size={24} color="#1a1a1a" />
          </button>
        </div>
      </div>
      <div className={`w-full  bg-[#f9faf9] md:fixed z-40 top-0`}>
        <div
          onClick={() => setShowSidebar(false)}
          className={`block md:hidden w-full fixed  top-0 bg-[rgba(51,51,51,.5)]  transform h-screen z-30 transition-all ${
            showSidebar ? "translate-x-0 " : "-translate-x-full delay-500"
          } ease-out`}
        ></div>

        <header
          className={`fixed z-[44] transition-all top-0  ${
            showSidebar ? " delay-500" : "translate-x-[-100%] "
          } ease-out md:static md:translate-x-0 `}
        >
          <div className="sidebar  bg-[#fff]  md:bg-transparent  relative ">
            <div className="h-screen py-8 md:py-0  w-[350px] md:w-full md:h-[80px] bg-none bg-opacity-100 flex flex-col md:flex-row md:justify-between md:items-center px-8 md:px-[64px] ">
              <div className="flex  flex-col md:flex-row md:items-center  h-full justify-between w-full relative">
                <div className="flex md:block items-center justify-between ">
                  <div className="flex gap-4 items-center">
                    <img
                      src="/logo.png"
                      className="hover:scale-110 transition-all wx] h-[50px] object-contain"
                      alt=""
                    />
                    <form
                      action=""
                      onSubmit={handleClick}
                      className="relative flex items-center"
                    >
                      <input
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        className="h-[40px] rounded border border-[#e6ebf3] outline-none text-base pl-2 hidden md:block pr-9"
                      />
                      <button className="absolute right-3" type="submit">
                        <IoSearchSharp size={20} color="#1a1a1a" />
                      </button>
                    </form>
                  </div>
                  <div className="block md:hidden">
                    <IoMdClose
                      size={22}
                      onClick={() => setShowSidebar(false)}
                      color="#1a1a1a"
                      className="block md:hidden"
                    />
                  </div>
                </div>

                <nav className="justify-self-start absolute md:static top-[100px] flex flex-col md:flex-row  gap-16 md:gap-[140px] lg:gap-[200px] lg:w-[490px]   ">
                  {navItem.map(({ href, title, Icon }, index) => {
                    return (
                      <Link
                        key={href}
                        onClick={index === 1 && openModal}
                        className={`text-[#FFFFFF99]  font-medium tracking-[1px] uppercase hover:text-white  duration-200   text-[13px] ${
                          path == href ? "active" : ""
                        }`}
                        href={`${href}`}
                      >
                        {<Icon size={30} title={title} color="#1a1a1a" />}
                      </Link>
                    );
                  })}
                </nav>

                <button
                  onClick={() => {
                    deleteCookie("auth");
                    deleteCookie("user_id");
                    client.clearStore();
                    router.push("/auth/login");
                  }}
                >
                  <TbLogout2 color="#1a1a1a" size={30} />
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navigations;

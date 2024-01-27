"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navItem } from "../data/app";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import CreatePostModal from "../Components/CreatePostModal";

const NavigationNav = ({ showSidebar, dispatch }) => {
  const path = usePathname();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);

  }
  return (
    <>
      <div className="fixed z-[100]" >
        <CreatePostModal
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
        />
      </div>

      <div className={`w-full  bg-[#1C4E80] md:fixed z-40 top-0`}>
        <div
          onClick={() => dispatch(false)}
          className={`block md:hidden w-full fixed  top-0 bg-[rgba(51,51,51,.5)]  transform h-screen z-40 transition-all ${
            showSidebar ? "translate-x-0 " : "-translate-x-full delay-500"
          } ease-out`}
        ></div>

        <header
          className={`fixed z-[100] transition-all top-0  ${
            showSidebar ? " delay-500" : "translate-x-[-100%] "
          } ease-out md:static md:translate-x-0 `}
        >
          <div className="sidebar  bg-[#1C4E80]  md:bg-transparent  relative z-[100">
            <div className="h-screen py-8 md:py-0  w-[350px] md:w-full md:h-[80px] bg-none bg-opacity-100 flex flex-col md:flex-row md:justify-between md:items-center px-8 md:px-[64px] ">
              <div className="flex  flex-col md:flex-row md:items-center  h-full justify-between w-full relative">
                <div className="flex md:block items-center justify-between ">
                  <div className="flex gap-4 items-center">
                    <img
                      src="/logo.png"
                      className="hover:scale-110 transition-all wx] h-[50px] object-contain"
                      alt=""
                    />
                    <input
                      type="search"
                      className="h-[40px] rounded outline-none text-base px-2 hidden md:block "
                    />
                  </div>
                  <div className="block md:hidden">
                    <IoMdClose
                      size={22}
                      onClick={() => dispatch(false)}
                      color="#FFFFFF"
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
                        {<Icon size={30} title={title} color="white" />}
                      </Link>
                    );
                  })}
                </nav>

                <div className="cursor-pointer ">
                  <TbLogout2 color="white" size={30} />
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default NavigationNav;

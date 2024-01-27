"use client";
import React from "react";
import Avatar from "react-avatar";
import { FaCamera } from "react-icons/fa";
import ResponsiveLayoutWithSidebar from "../layout/ResponsiveLayoutWithSidebar";
import Card from "../Components/Card";

const page = () => {
  return (
    <>
      <ResponsiveLayoutWithSidebar />
      <div className="p-3 mt-[70px] md:mt-4 md:p-10">
        <div className="flex justify-center my-10 relative">
          <Avatar name="Foo Bar" size={200} round={true} />
          <div className="absolute bottom-5  flex items-center bg-red-500 justify-center">
            <div className="relative">
              <input
                type="file"
                className="w-[25px] h-[22px] absolute z-10 opacity-0"
              />
              <FaCamera size={22} className="absolute" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap md:flex-none justify-center">
          <Card />
        </div>
      </div>
    </>
  );
};

export default page;

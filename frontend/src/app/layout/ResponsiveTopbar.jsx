"use client";
import React, { FC, useEffect, useState } from "react";
import { GrMenu } from "react-icons/gr";
import Image from "next/image";

const ResponsiveTopBar = ({ dispatch }) => {
  return (
    <div className={`w-full fixed top-0 z-40`}>
      <div className="flex md:hidden  z-40 top-0 h-[65px] w-full bg-[#1C4E80]  justify-between items-center px-4 md:px-8">
        <img
          src="/logo.png"
          alt="logo"
          className="rounded-md py-2 px-1 object-cover h-[40px]"
        />

        <button className="cursor-pointer" onClick={() => dispatch(() => true)}>
          <GrMenu size={24} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ResponsiveTopBar;

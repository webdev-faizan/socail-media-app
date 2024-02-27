"use client";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaCamera } from "react-icons/fa";
import ResponsiveLayoutWithSidebar from "../layout/ResponsiveLayoutWithSidebar";
import Cards from "../Components/Cards";
import { GET_USER_POST } from "../graphql/query/post";
import { useMutation } from "@apollo/client";

const page = () => {
  // const [mutateFunction] = useMutation(NEW_PASSWORD, {
  //   fetchPolicy: "no-cache",
  //   onCompleted: ({ newPassword }) => {
  //     toast.success(newPassword.message, {
  //       autoClose: 1500,
  //     });
  //     reset();
  //   },
  //   onError: ({ message }) => {
  //     toast.error(message, {
  //       autoClose: 1500,
  //     });
  //   },
  // });
  const onChangeHandler = (e) => {
    mutateFunction({
      variables: {
        profile: e.traget.files[0],
      },
    });
  };
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
                multiple={false}
                onChange={onChangeHandler}
                accept="Image/*"
                className="w-[25px] h-[22px] absolute z-10 opacity-0"
              />
              <FaCamera size={22} className="absolute" />
            </div>
          </div>
        </div>
        <Cards query={GET_USER_POST} />
      </div>
    </>
  );
};

export default page;

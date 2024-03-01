"use client";
import { useState } from "react";
import Link from "next/link";
import Avatar from "react-avatar";
import { FaCamera } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client";
import { PROFILE_CHANGE } from "../graphql/mutations/profile";
import { GET_USER_POST } from "../graphql/query/post";
import ResponsiveLayoutWithSidebar from "../layout/ResponsiveLayoutWithSidebar";
import { GET_USER_PERSONAL_INFO } from "../graphql/query/profile";
import Cards from "../Components/Cards";
import ShareSocailMedial from "../Components/ShareSocailMedial";


const page = () => {
  const { data, refetch } = useQuery(GET_USER_PERSONAL_INFO);
  const [showShare, setShowShare] = useState(false);
  const { firstName, lastName, profile, _id } = data?.getUserPersonalInfo || {};
  const [mutateFunction] = useMutation(PROFILE_CHANGE, {
    fetchPolicy: "no-cache",
    onCompleted: ({ profileChange }) => {
      refetch();
      toast.success(profileChange.message, {
        autoClose: 1500,
      });
    },
    onError: ({ message }) => {
      toast.error(message, {
        autoClose: 1500,
      });
    },
  });
  const handlerProfile = (e) => {
    mutateFunction({
      variables: {
        profile: e.target.files[0],
      },
    });
  };
  return (
    <>
      <ToastContainer />
      <ResponsiveLayoutWithSidebar />
      <ShareSocailMedial
        url={`/user/${_id}`}
        showShare={showShare}
        setShowShare={setShowShare}
      />
      <div className="p-3 mt-[70px] md:mt-4 md:p-10">
        <div className="flex justify-center my-10 relative">
          <Avatar
            style={{
              border: "2px solid gray",
            }}
            src={`${profile}`}
            name={`${firstName ? firstName + " " : ""}${
              lastName ? lastName : ""
            }`}
            size={200}
            round={true}
          />

          <div className="absolute bottom-5  flex items-center bg-red-500 justify-center">
            <form encType="multipart/form-data" className="relative">
              <input
                type="file"
                multiple={false}
                onChange={handlerProfile}
                accept="Image/*"
                className="w-[25px] h-[22px] absolute z-10 opacity-0"
              />
              <FaCamera size={22} className="absolute" />
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center font-medium text-2xl text-gray-800">
          <h6 className="text-center border-b-4 border-blue-500 pb-2 capitalize">
            {firstName && firstName} {lastName && lastName}
          </h6>
        </div>
        <br />
        <div className="flex justify-center gap-2">
          <Link
            href={`/user${_id}`}
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Preview Profile
          </Link>

          <button
            onClick={() => setShowShare(!showShare)}
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Share
          </button>
        </div>

        <Cards query={GET_USER_POST} />
      </div>
    </>
  );
};

export default page;

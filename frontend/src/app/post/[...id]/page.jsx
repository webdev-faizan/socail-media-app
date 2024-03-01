"use client";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaRegComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { getCookie } from "cookies-next";
import Link from "next/link";
import ResponsiveLayoutWithSidebar from "../../layout/ResponsiveLayoutWithSidebar";
import Comments from "../../Components/Comments";
import LikeButtton from "../../Components/LikeButtton";
import { GET_SHARE_POST } from "../../graphql/query/post";
import ShareSocailMedial from "../../Components/ShareSocailMedial";
const user_id = getCookie("user_id");

const page = ({ params }) => {
  const [showShare, setShowShare] = useState(false);
  const [postId, setPostId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [foundPost, setFoundpost] = useState(false);
  const id = params.id[0].toString();
  const { loading, data } = useQuery(GET_SHARE_POST, {
    variables: {
      id,
    },
    fetchPolicy: "cache-and-network",
    onError: ({ graphQLErrors }) => {
      if (graphQLErrors[0].status == 404) {
        setFoundpost(true);
      }
    },
    onCompleted: () => {
      setFoundpost(false);
    },
  });
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  if (foundPost) {
    return (
      <>
        <ResponsiveLayoutWithSidebar />

        <div className="h-screen  text-5xl font-semibold text-center justify-center flex items-center w-screen sm:text-6xl">
          No posts found. 😇😇
        </div>
      </>
    );
  }
  return (
    <>
      <ResponsiveLayoutWithSidebar />
      <Comments
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        postId={postId}
      />
      {/*  */}
      <div className="p-3 mt-[70px] md:mt-12 md:p-10">
        <div className="flex gap-10  justify-center flex-wrap  w-full">
          <div className="flex  justify-center ">
            {data?.getSharePost.data.map((data) => {
              const {
                createdAt,
                id,
                title,
                description,
                attachment,
                commentCount,
                likeCount,
                postOwner,
                likes,
              } = data;
              const date = new Date(createdAt);
              const postCreatedAt = format(date, "d MMM yyyy");
              const { firstName, lastName, id: userid } = postOwner;
              const isLikeUser =
                user_id &&
                Boolean(
                  likes &&
                    likes.find(
                      (alluserid) => alluserid.toString() == user_id.toString()
                    )
                );

              return (
                <div className=" relative bg-[#617f9c] border border-gray-200 rounded-lg shadow w-full sm:w-[360px] md:w-[500px] ">
                  <Link
                    href={`/profile/user/${userid}`}
                    className="cursor-pointer "
                  >
                    <div className="flex items-center p-2 ">
                      <div className="flex-shrink-0">
                        <img
                          className="w-9 h-9 rounded-full object-center"
                          src="/image-1.jpg"
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm capitalize font-medium text-gray-900 truncate dark:text-white">
                          {firstName + " " + lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-[2px]">
                          {postCreatedAt}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <img
                    className="rounded-t-lg  min-h-[140px] md:min-h-[200px]"
                    src="/image-1.jpg"
                  />
                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 darks:text-white">
                      {title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 darks:text-gray-400">
                      {description}
                    </p>
                    <div className="flex  justify-between cursor-pointer">
                      <div className="flex gap-1">
                        <LikeButtton
                          postId={id}
                          isLikeUser={isLikeUser}
                          likeCount={likeCount}
                        />
                      </div>
                      <div className="flex gap-1">
                        <FaRegComment
                          size={20}
                          onClick={() => {
                            openModal();
                            setPostId(id);
                          }}
                        />
                        {commentCount}{" "}
                      </div>
                      <div className="flex gap-1">
                        <ShareSocailMedial
                          showShare={showShare}
                          url={`/post/${id}`}
                          setShowShare={setShowShare}
                        />
                        <button onClick={() => setShowShare(!showShare)}>
                          <FaShare size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;

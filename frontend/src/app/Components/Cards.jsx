"use client";
import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Avatar from "react-avatar";
import LikeButtton from "./LikeButtton";
import Comments from "./Comments";
import ShareSocailMedial from "./ShareSocailMedial";
import CardSkeletonLoader from "../Components/loader/CardSkeletonLoader";
import { useSearchParams } from "next/navigation";
import { IoIosSend } from "react-icons/io";
import { TfiCommentsSmiley } from "react-icons/tfi";
const user_id = getCookie("user_id");

const Cards = ({ query }) => {
  const searchParams = useSearchParams();
  const [postId, setPostId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const ref = useRef(2);
  const [showShare, setShowShare] = useState(false);
  const [foundPost, setFoundpost] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const { loading, data, fetchMore } = useQuery(query, {
    variables: {
      pageNo: 1,
      limit: 3,
      ...(window.location.pathname == "/" && {
        query: searchParams.get("query"),
      }),
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
  const handleScroll = () => {
    if (
      window.pageYOffset + window.innerHeight + 5 >
      document.documentElement.scrollHeight
    ) {
      fetchMore({
        variables: {
          limit: 3,
          pageNo: ref.current,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (fetchMoreResult.getAllPost.data.length > 0) {
            ref.current += 1;
            return {
              ...prev,
              ...fetchMoreResult,
            };
          }
        },
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const POST = data?.getAllPost?.data || data?.getUserPost?.data;
  if (foundPost) {
    return (
      <>
        <div className="h-screen text-3xl overflow-clip md:text-5xl font-semibold text-center justify-center flex items-center w-full sm:text-6xl">
          No posts found. 😇😇
        </div>
      </>
    );
  }

  return (
    <div>
      <Comments
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        postId={postId}
      />
      <div className="p-3 md:px-6 ">
        <div className="flex gap-10  justify-center md:justify-start flex-wrap ">
          <div className="grid  gap-x-2 gap-y-3 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {POST?.map((data) => {
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
                <div className="max-w-sm relative  hover:shadow-xl hover:shadow-slate-500 bg-white  rounded-lg shadow h-fit border border-[#e6ebf3]">
                  <Link
                    href={`/profile/user/${userid}`}
                    className="cursor-pointer "
                  >
                    <div className="flex items-center p-2 ">
                      <div className="flex-shrink-0">
                        <Avatar
                          style={{
                            border: "2px solid gray",
                          }}
                          // src={`${profile}`}
                          name={`${firstName ? firstName + " " : ""}${
                            lastName ? lastName : ""
                          }`}
                          size={40}
                          round={true}
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-xl font-medium tex-[gb(10, 11, 14)] capitalize">
                          {firstName} {lastName}
                        </p>

                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-[2px]">
                          {postCreatedAt}
                        </p>
                      </div>
                    </div>
                    <hr className="" />
                  </Link>
                  <Link
                    href={`/post/${id}`}
                    className="cursor-pointer w-full block bg-white"
                    target="_blank"
                  >
                    <img
                      className="rounded-t-lg h-[250px]"
                      src="image-1.jpg"
                      alt
                    />
                  </Link>
                  <div className="pb-2">
                    <div className="p-3 ">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-[#202124]">
                        {title}
                      </h5>
                      <p className="mb-3 font-normal text-[#202124] max-h-[50px] overflow-hidden">
                        {description}
                      </p>
                    </div>
                    <div className="flex  justify-between cursor-pointer border-y py-2  px-5  ">
                      <div className="flex gap-1">
                        <LikeButtton
                          postId={id}
                          isLikeUser={isLikeUser}
                          likeCount={likeCount}
                        />
                      </div>
                      <div className="flex gap-1">
                        <TfiCommentsSmiley
                          size={20}
                          onClick={() => {
                            openModal();
                            setPostId(id);
                          }}
                        />
                        {commentCount}{" "}
                      </div>
                      <div className="flex gap-1 ">
                        <ShareSocailMedial
                          showShare={showShare}
                          url={`/post/${id}`}
                          setShowShare={setShowShare}
                        />
                        <button onClick={() => setShowShare(!showShare)}>
                          <IoIosSend size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="grid  gap-x-2 gap-y-3 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {loading &&
              [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                <CardSkeletonLoader key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;

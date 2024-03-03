"use client";
import { IoIosSend } from "react-icons/io";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { format } from "date-fns";
import Avatar from "react-avatar";

import { useQuery } from "@apollo/client";
import { GET_VIEW_USER_POST } from "../../../graphql/query/post";
import { GET_VIEW_PERSONAL_INFO } from "../../../graphql/query/profile";
import ShareSocailMedial from "../../../Components/ShareSocailMedial";
import { useEffect, useState } from "react";
import Link from "next/link";
import LikeButtton from "../../../Components/LikeButtton";
import Comments from "../../../Components/Comments";
import CardSkeletonLoader from "../../../Components/loader/CardSkeletonLoader";
import ProtectRoutes from "../../../Components/ProtectRoutes";
const Page = ({ params }) => {
  const user_id = params.id[0];
  const { data: userInfo } = useQuery(GET_VIEW_PERSONAL_INFO, {
    variables: {
      id: user_id,
    },
    fetchPolicy: "cache-and-network",
  });
  const { firstName, lastName, profile, _id } = userInfo?.getViewUserInfo || {};
  const [showShare, setShowShare] = useState(false);
  const [postId, setPostId] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [foundPost, setFoundpost] = useState(false);
  const [page, setPage] = useState(1);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const { data, fetchMore, loading } = useQuery(GET_VIEW_USER_POST, {
    variables: {
      page: 10,
      limit: 1,
      id: user_id,
    },
    fetchPolicy: "cache-and-network",
    onError: ({ graphQLErrors }) => {
      setFoundpost(true);
    },
    onCompleted: () => {
      setFoundpost(false);
    },
  });
  const handleScroll = () => {
    if (
      window.pageYOffset + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
      fetchMore({
        variables: {
          id: user_id,
          limit: 10,
          page: page,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          return {
            ...prev,
            ...fetchMoreResult,
          };
        },
      });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, fetchMore]);

  if (foundPost) {
    return (
      <>
        <div className="h-screen  text-5xl font-semibold text-center justify-center flex items-center w-screen sm:text-6xl">
          No found. 😇😇
        </div>
      </>
    );
  }
  return (
    <ProtectRoutes>
      <Comments
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        postId={postId}
      />
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
        </div>
        <div className="flex justify-center items-center font-medium text-2xl text-gray-800">
          <h6 className="text-center border-b-4 border-blue-500 pb-2 capitalize">
            {firstName && firstName} {lastName && lastName}
          </h6>
        </div>
        <br />
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setShowShare(!showShare)}
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Share
          </button>
        </div>
        <div>
          <div className="flex   justify-center mt-6 ">
            <div className="grid  gap-x-2 gap-y-3 xsm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data?.getViewUserPost?.data.map((data) => {
                const {
                  createdAt,
                  _id,
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
                const { firstName, lastName, _id: userid } = postOwner;
                const isLikeUser =
                  user_id &&
                  Boolean(
                    likes &&
                      likes.find(
                        (alluserid) =>
                          alluserid.toString() == user_id.toString()
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
                          <img
                            className="w-10 h-10 rounded-full object-center border-2"
                            src="/image-1.jpg"
                            alt="Neil image"
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
                      href={`/post/${_id}`}
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
                            postId={_id}
                            isLikeUser={isLikeUser}
                            likeCount={likeCount}
                          />
                        </div>
                        <div className="flex gap-1">
                          <TfiCommentsSmiley
                            size={20}
                            onClick={() => {
                              openModal();
                              setPostId(_id);
                            }}
                          />
                          {commentCount}{" "}
                        </div>
                        <div className="flex gap-1 ">
                          <ShareSocailMedial
                            showShare={showShare}
                            url={`/post/${_id}`}
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
    </ProtectRoutes>
  );
};

export default Page;

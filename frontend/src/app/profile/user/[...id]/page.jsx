"use client";
import Avatar from "react-avatar";
import { ToastContainer, toast } from "react-toastify";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { GET_VIEW_USER_POST } from "../../../graphql/query/post";
import ResponsiveLayoutWithSidebar from "../../../layout/ResponsiveLayoutWithSidebar";
import { GET_VIEW_PERSONAL_INFO } from "../../../graphql/query/profile";
import ShareSocailMedial from "../../../Components/ShareSocailMedial";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegComment, FaShare } from "react-icons/fa";
import LikeButtton from "../../../Components/LikeButtton";
import Comments from "../../../Components/Comments";

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
  const { data, fetchMore } = useQuery(GET_VIEW_USER_POST, {
    variables: {
      page: 1,
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
  console.log(data);
  const handleScroll = () => {
    if (
      window.pageYOffset + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
      fetchMore({
        variables: {
          id: user_id,
          limit: 2,
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
        <ResponsiveLayoutWithSidebar />
        <div className="h-screen  text-5xl font-semibold text-center justify-center flex items-center w-screen sm:text-6xl">
          No found. 😇😇
        </div>
      </>
    );
  }
  return (
    <>
      <ToastContainer />
      <ResponsiveLayoutWithSidebar />
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
          <div className="p-3 mt-[70px] md:mt-12 md:p-10">
            <div className="flex gap-10  justify-center md:justify-start flex-wrap ">
              <div className="flex  flex-wrap justify-between gap-6">
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
                    <div className="max-w-sm relative  bg-blue-500 border border-gray-200 rounded-lg shadow ">
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
                            <p className="text-xl font-medium dark:text-white capitalize">
                              {firstName} {lastName}
                            </p>

                            <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-[2px]">
                              {postCreatedAt}
                            </p>
                          </div>
                        </div>
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
                      <div className="p-5 ">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 darks:text-white">
                          {title}
                        </h5>
                        <p className="mb-3 font-normal text-gray-700 darks:text-gray-400">
                          {description}
                        </p>
                        <div className="flex  justify-between cursor-pointer ">
                          <div className="flex gap-1">
                            <LikeButtton
                              postId={_id}
                              isLikeUser={isLikeUser}
                              likeCount={likeCount}
                            />
                          </div>
                          <div className="flex gap-1">
                            <FaRegComment
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
        </div>
      </div>
    </>
  );
};

export default Page;

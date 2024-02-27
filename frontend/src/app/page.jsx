"use client";
import { FaRegComment } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "cookies-next";
import ResponsiveLayoutWithSidebar from "./layout/ResponsiveLayoutWithSidebar";
import Comments from "./Components/Comments";
import LikeButtton from "./Components/LikeButtton";
import { useQuery } from "@apollo/client";
import { GET_ALL_POST } from "./graphql/query/post";
import { format } from "date-fns";
const user_id = getCookie("user_id");
export default function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [postId, setPostId] = useState("");
  const [page, setPage] = useState(1);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const { loading, error, data, fetchMore } = useQuery(GET_ALL_POST, {
    variables: {
      page: 1,
      limit: 1,
    },
    fetchPolicy: "cache-first",
    // fetchPolicy: "cache-and-network",
  });
  const handleScroll = () => {
    if (
      window.pageYOffset + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setPage(page + 1);
      fetchMore({
        variables: {
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

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [modalIsOpen]);

  return (
    <>
      <Comments
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        postId={postId}
      />
      <ResponsiveLayoutWithSidebar />
      <div className="p-3 mt-[70px] md:mt-12 md:p-10">
        <div className="flex gap-10  justify-center md:justify-start flex-wrap ">
          <div className="flex  flex-wrap justify-between gap-6">
            {data?.getAllPost.data.map((data) => {
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
              const isLikeUser = Boolean(
                likes &&
                  likes.find(
                    (alluserid) => alluserid.toString() == user_id.toString()
                  )
              );

              return (
                <div className="max-w-sm relative bg-[#617f9c] border border-gray-200 rounded-lg shadow ">
                  <Link
                    href={`/profile?user=${userid}`}
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
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {firstName + " " + lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-[2px]">
                          {postCreatedAt}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <img className="rounded-t-lg" src="image-1.jpg" alt />
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
                        <FaShare size={20} />
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
}

// fetch("/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     query: `
// query getalluser{
//   quotes{
//     name
//     email
//   }
// }

// `,
//   }),
// });

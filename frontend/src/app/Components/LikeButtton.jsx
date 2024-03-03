"use client";
import React, { useState } from "react";
import { RiThumbUpFill } from "react-icons/ri";
import { MdOutlineThumbUpAlt } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { ADD_LIKE } from "../graphql/mutations/post";
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
const LikeButton = ({ postId, isLikeUser, likeCount }) => {
  const [liked, setLiked] = useState({
    liked: isLikeUser,
    likeCount,
  });
  const [mutationFunction, { loading, reset }] = useMutation(ADD_LIKE, {
    fetchPolicy: "no-cache",
    onError: ({ message }) => {
      toast.error(message, {
        autoClose: 1500,
      });
    },
  });
  const handleLikeClick = async () => {
    console.log("handle clike");
    if (liked.liked) {
      setLiked((prev) => {
        return {
          liked: !prev.liked,
          likeCount: prev.likeCount - 1,
        };
      });
    } else {
      setLiked((prev) => {
        return {
          liked: !prev.liked,
          likeCount: prev.likeCount + 1,
        };
      });
    }

    mutationFunction({
      variables: {
        postId,
      },
    });
  };
  return (
    <button className="flex gap-1">
      {liked.liked ? (
        <IoIosHeart size={22} color="#FF3939" onClick={handleLikeClick} />
      ) : (
        <CiHeart size={22} onClick={handleLikeClick} />
      )}
      {liked.likeCount}
    </button>
  );
};

export default LikeButton;

// border dark:border-border-color rounded-md bg-white dark:bg-background-primary hover:cursor-pointer dark:hover:shadow-xl dark:hover:shadow-[#0E1A2A] hover:shadow-xl hover:shadow-salaty-500/40 w-[undefined] p-2 
"use client";
import React, { useState } from "react";
import { RiThumbUpFill } from "react-icons/ri";
import { MdOutlineThumbUpAlt } from "react-icons/md";
import { useMutation } from "@apollo/client";
import { ADD_LIKE } from "../graphql/mutations/post";

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
        <RiThumbUpFill size={20} onClick={handleLikeClick} />
      ) : (
        <MdOutlineThumbUpAlt size={20} onClick={handleLikeClick} />
      )}
      {liked.likeCount}
    </button>
  );
};

export default LikeButton;

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { IoMdSend } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_COMMENT } from "../graphql/mutations/post";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import { GET_COMMENTS } from "../graphql/query/post";
import { formatDistanceToNow } from "date-fns";

const Comments = ({ modalIsOpen, closeModal, postId, setCommentCount }) => {
  const [comment, setComments] = useState("");
  const { data, refetch } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
    },
    fetchPolicy: "no-cache",
  });
  useEffect(() => {
    if (postId) {
      refetch({ postId });
    }
  }, [postId]);
  const [mutationFunction, { loading, reset }] = useMutation(CREATE_COMMENT, {
    fetchPolicy: "no-cache",
    onError: ({ message }) => {
      toast.error(message, {
        autoClose: 1500,
      });
    },
    onCompleted: () => {
      setCommentCount((prev) => prev + 1);
      refetch();
      setComments("");
      reset();
    },
  });
  const postComment = async (e) => {
    e.preventDefault();
    if (!comment) return;
    mutationFunction({
      variables: {
        data: {
          comment: comment,
          postId,
        },
      },
    });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="w-full md:w-[400px]">
          <div className=" h-[120px]">
            <FaWindowClose
              size={30}
              className="mb-5 ml-auto"
              onClick={closeModal}
            />
            <form className=" " onSubmit={postComment}>
              <div className="w-full">
                <div className="flex justify-center items-center relative">
                  <input
                    value={comment}
                    onChange={(e) => setComments(e.target.value)}
                    type="text"
                    className="border-[1px] h-[36px] w-[97%] rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none pr-8"
                  />
                  <button
                    disabled={loading}
                    type="submit"
                    className="absolute right-2 grid place-content-center"
                  >
                    {loading ? (
                      <>
                        {" "}
                        <ClipLoader color="#36d7b7" size={20} />
                      </>
                    ) : (
                      <IoMdSend size={20} />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className=" ">
            {data &&
              data.getComments &&
              Array.isArray(data.getComments.data) &&
              data?.getComments?.data.map(({ comment, createdAt, user }) => {
                const { firstName, lastName } = user;
                const createdAtDate = new Date(parseInt(createdAt, 10));
                const CreatedAt = formatDistanceToNow(createdAtDate, {
                  addSuffix: true,
                });
                return (
                  <div
                    key={createdAt}
                    className="flex p-2 mt-5 border-b border-gray-200 "
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full object-center"
                        src="/image-1.jpg"
                        alt={`${firstName} ${lastName}'s Profile Picture`}
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {firstName} {lastName}
                        </p>
                        <p className="text-base text-black">{CreatedAt}</p>
                      </div>
                      <p className="text-sm text-gray-700">{comment}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Comments;
const customStyles = {
  overlay: {
    zIndex: 49,
    // overflowY: "hidden",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "#617f9c",
    transform: "translate(-50%, -50%)",
    height: "100vh",
    // overflowY: "hidden",
  },
};

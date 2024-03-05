"use client";
import React, { use, useRef, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaWindowClose } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { CREATE_POST } from "../../app/graphql/mutations/post";
import { ToastContainer, toast } from "react-toastify";

const fieldIsRequired = "this field is required";
const schemaCreatePost = yup.object({
  title: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(4, "min length must be at least 3 characters")
    .max(30, "Max length must be less than 40 characters"),
  description: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(10, "min length must be at least 20 characters")
    .max(50, " the description to less than 20 characters."),
  // atttachment: yup
  //   .mixed()
  //   .required(fieldIsRequired)
  //   .test("fileSize", "File size must be less than 5MB", (value) => {
  //     if (!value) return false;
  //     const file = value[0];
  //     return file.size <= 1 * 1024 * 1024;
  //   })
  //   .test("fileType", "Invalid file type. Only images are allowed", (value) => {
  //     if (!value) return true;
  //     return value[0].type.startsWith("image/");
  //   }),
});

const customStyles = {
  overlay: {
    zIndex: 58,
    background: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "100vh",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 59,
  },
};

const CreatePostModal = ({ closeModal, openModal, modalIsOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreatePost),
    mode: "onTouched",
  });
  const [MutationFunction, { loading }] = useMutation(CREATE_POST, {
    fetchPolicy: "no-cache",
    onCompleted: ({ createPost }) => {
      toast.success(createPost.message, {
        autoClose: false,
      });
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
  const useref = useRef();
  const onSubmit = async (data) => {
    const { title, description } = data;
    if (!useref.current.files) return;
    MutationFunction({
      variables: {
        data: {
          atttachment: useref.current.files[0],
          title,
          description,
        },
      },
      onCompleted: () => {
        reset();
        useref.current.destroy();
      },
      onError: ({ networkError }) => {
        if (networkError) {
          toast.error(networkError.result.errors[0].message, {
            autoClose: 1500,
          });
        }
      },
    });
  };

  return (
    <>
      <ToastContainer />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className=" fixed right-0"></div>
        <FaWindowClose size={30} className=" ml-auto" onClick={closeModal} />
        <section>
          <div className="flex justify-center  h-full px-3 pb-3">
            <div className="w-full xsm:w-[400px]">
              <h6 className="  text-black  text-[26px] font-medium">
                📝 Create a Post
              </h6>
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    {useref?.current?.files && (
                      <img
                        className="w-full  h-[200px] object-center object-cover"
                        src={
                          useref &&
                          useref.current &&
                          useref.current.files &&
                          useref.current.files[0]
                            ? URL.createObjectURL(useref.current.files[0])
                            : ""
                        }
                        alt="Selected Image"
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="" className="text-[#36454F] ">
                      Choose Image<span className="text-[#E60A0A]"> *</span>{" "}
                    </label>
                    <div>
                      <input
                        autoComplete="off"
                        type="file"
                        accept="Image/*"
                        required
                        ref={useref}
                        // {...register("atttachment")}
                        className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] flex items-center p-[2px] border-[#D0D3E8] border-solid outline-none"
                        placeholder="Title"
                      />
                      <small className="text-[#E60A0A]  first-letter:uppercase">
                        {errors.atttachment?.message}
                      </small>
                    </div>
                    <label htmlFor="" className="text-[#36454F]">
                      Title<span className="text-[#E60A0A]"> *</span>{" "}
                    </label>
                    <div className="flex relative items-center w-full">
                      <input
                        autoComplete="off"
                        type="text"
                        {...register("title")}
                        className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none"
                        placeholder="Title"
                      />
                    </div>
                    <small className="text-[#E60A0A]  first-letter:uppercase">
                      {errors.title?.message}
                    </small>

                    <label htmlFor="" className="text-[#36454F]">
                      Description<span className="text-[#E60A0A]"> *</span>{" "}
                    </label>
                    <div className="flex relative items-center w-full">
                      <textarea
                        autoComplete="off"
                        type="text"
                        {...register("description")}
                        className="border-[1px] h-[250px] md:h-[200px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none"
                        placeholder="Description"
                      ></textarea>
                    </div>
                    <small className="text-[#E60A0A]  first-letter:uppercase">
                      {errors.description?.message}
                    </small>
                  </div>

                  <button
                    type="submit"
                    mode="primary"
                    rounded="md"
                    disabled={loading}
                    class="w-full  false  bg-blue-500 border-blue-500 text-white hover:border-blue-500 hover:bg-blue-700 border-[1px] flex justify-center items-center px-8 py-2 text-md rounded-md  "
                  >
                    {" "}
                    {loading ? "Creating post..." : "Create Post"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </Modal>
    </>
  );
};

export default CreatePostModal;

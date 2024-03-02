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
const schemaSignup = yup.object({
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
  atttachment: yup
    .mixed()
    .required(fieldIsRequired)
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value) return false;
      const file = value[0];
      return file.size <= 1 * 1024 * 1024;
    })
    .test("fileType", "Invalid file type. Only images are allowed", (value) => {
      if (!value) return true;
      return value[0].type.startsWith("image/");
    }),
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
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });
  const [file, setFile] = useState("");

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
    const { atttachment, title, description } = data;

    MutationFunction({
      variables: {
        data: {
          atttachment: useref.current.files[0],
          title,
          description,
        },
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
        <FaWindowClose
          size={30}
          className="mb-3 ml-auto"
          onClick={closeModal}
        />
        <section>
          <div className="flex justify-center  h-full px-3">
            <div className="w-full xsm:w-[400px]">
              <div className="py-3">
                <h6 className="  text-[#1C4E80]  text-[26px] font-medium">
                  Create a post
                </h6>
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    {watch("atttachment")?.length > 0 && (
                      <img
                        className="w-full  h-[200px] object-center object-cover"
                        src={
                          watch("atttachment")?.length > 0 &&
                          URL.createObjectURL(watch("atttachment")[0])
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
                        ref={useref}
                        onChange={(e) => setFile(e.target.files[0])}
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
                    className="bg-[#1C4E80] min-h-[46px] rounded-3xl text-white w-full "
                  >
                    Create Post
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

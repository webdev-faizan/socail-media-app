"use client";
import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaWindowClose } from "react-icons/fa";

const fieldIsRequired = "this field is required";
const schemaSignup = yup.object({
  title: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(4, "min length must be at least 3 characters"),
  description: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(20, "min length must be at least 20 characters"),
  file: yup
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
        zIndex: 100, // Adjust this value based on your needs
      },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    height: "100vh",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100,
  },
};

const CreatePostModal = ({ closeModal, openModal, modalIsOpen }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setValue("file", file);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <FaWindowClose size={30} className="mb-3 ml-auto" onClick={closeModal} />
      <section>
        <div className="flex justify-center  h-full px-3">
          <div className="w-full xsm:w-[400px]">
            <div className="py-3">
              <h6 className="  text-[#1C4E80]  text-[26px] font-medium">
                Create a post
              </h6>
            </div>
            {/*  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <div>
                  {watch("file")?.length > 0 && (
                    <img
                      className="w-full  h-[200px] object-center object-cover"
                      src={
                        watch("file")?.length > 0 &&
                        URL.createObjectURL(watch("file")[0])
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
                      onChange={handleFileChange}
                      accept="Image/*"
                      {...register("file")}
                      className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] flex items-center p-[2px] border-[#D0D3E8] border-solid outline-none"
                      placeholder="Title"
                    />
                    <small className="text-[#E60A0A]  first-letter:uppercase">
                      {errors.file?.message}
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
  );
};

export default CreatePostModal;

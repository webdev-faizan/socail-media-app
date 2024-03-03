"use client";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { FaRegFaceFlushed } from "react-icons/fa6";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import RegistrationModal from "../../modal/RegistrationSuccessModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaRegFaceDizzy } from "react-icons/fa6";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../graphql/mutations/auth";
import { useRouter } from "next/navigation";
import RequireGuest from "../../Components/RequireGuest";

const fieldIsRequired = "this field is required";
const schemaSignup = yup.object({
  firstName: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(3, "First name must be at least 3 charactersr"),
  lastName: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(3, "min length must be at least 3 characters"),
  email: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.com)?$/,
      "Invalid email format"
    ),
  password: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(8, "min length must be at least 8 characters")
    .matches(
      /^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\da-zA-Z]).*)$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long"
    ),

  cpassword: yup
    .string()
    .required(fieldIsRequired)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  tac: yup.boolean().oneOf([true], "Please accept the terms and conditions"),
});

const signup = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });

  const [mutateFunction, { loading, reset }] = useMutation(SIGNUP_USER, {
    fetchPolicy: "no-cache",
    onError: ({ message }) => {
      toast.error(message);
    },
    onCompleted: () => {
      setShowModal(true);
      reset();
    },
  });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/auth/login");
  };

  const onSubmit = async (data) => {
    try {
      const { firstName, lastName, email, password, tac } = await data;
      await mutateFunction({
        variables: {
          data: {
            firstName,
            lastName,
            email,
            password,
            tac,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <RequireGuest>
      <ToastContainer />
      {showModal && (
        <RegistrationModal
          handleClose={handleCloseModal}
          firstName={getValues("firstName")}
          lastName={getValues("lastName") || ""}
        />
      )}
      <section className=" py-3 sm:py-5 md:py-10">
        <div className="flex justify-center  h-full px-3">
          <div className="w-full xsm:w-[400px]">
            <div className="py-3">
              <h6 className="  text-[#1C4E80]  text-[26px] font-medium">
                Registration
              </h6>
            </div>
            {/*  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="" className="text-[#36454F]">
                    First Name<span className="text-[#E60A0A]"> *</span>{" "}
                  </label>
                  <div className="flex relative items-center w-full">
                    <input
                      {...register("firstName")}
                      autoComplete="off"
                      type="text"
                      className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none"
                      placeholder="First Name"
                    />

                    <LuUser2
                      size={16}
                      color="#4682BE"
                      className="absolute right-3"
                    />
                  </div>
                  <small className="text-[#E60A0A]  first-letter:uppercase">
                    {errors.firstName?.message}
                  </small>
                </div>

                <div className="flex flex-col gap-2 ">
                  <label htmlFor="" className="text-[#36454F]">
                    Last Name<span className="text-[#E60A0A]"> *</span>{" "}
                  </label>
                  <div className="flex relative items-center w-full">
                    <input
                      {...register("lastName")}
                      autoComplete="off"
                      type="text"
                      id=""
                      className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none"
                      placeholder="Last Name"
                    />
                    <LuUser2
                      size={16}
                      color="#4682BE"
                      className="absolute right-3"
                    />
                  </div>
                  <small className="text-[#E60A0A]">
                    {errors.lastName?.message}
                  </small>
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="" className="text-[#36454F]">
                    Email<span className="text-[#E60A0A]"> *</span>{" "}
                  </label>
                  <div className="flex relative items-center w-full">
                    <input
                      autoComplete="off"
                      type="email"
                      // required
                      id=""
                      {...register("email")}
                      className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none"
                      placeholder="Email"
                    />
                    <MdOutlineMail
                      size={16}
                      color="#694C7F"
                      className="absolute right-3"
                    />
                  </div>
                  <small className="text-[#E60A0A]  first-letter:uppercase">
                    {errors.email?.message}
                  </small>
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="" className="text-[#36454F]">
                    Password<span className="text-[#E60A0A]"> *</span>{" "}
                  </label>
                  <div className="flex relative items-center w-full">
                    <input
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      id=""
                      className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none"
                      placeholder="Password"
                    />
                    {showPassword ? (
                      <FaRegFaceFlushed
                        onClick={handleTogglePassword}
                        size={19}
                        color="#4682BE"
                        className="absolute right-3"
                      />
                    ) : (
                      <FaRegFaceDizzy
                        onClick={handleTogglePassword}
                        size={19}
                        color="#4682BE"
                        className="absolute right-3"
                      />
                    )}
                  </div>
                  <small className="text-[#E60A0A]  first-letter:uppercase">
                    {errors.password?.message}
                  </small>
                </div>

                <div className="flex flex-col gap-2 ">
                  <label htmlFor="" className="text-[#36454F] capitalize">
                    confrim password<span className="text-[#E60A0A]"> *</span>{" "}
                  </label>
                  <div className="flex relative items-center w-full">
                    <input
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      {...register("cpassword")}
                      className="border-[1px] h-[36px] w-full rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none"
                      placeholder="Password"
                    />
                    {showPassword ? (
                      <FaRegFaceFlushed
                        onClick={handleTogglePassword}
                        size={19}
                        color="#4682BE"
                        className="absolute right-3"
                      />
                    ) : (
                      <FaRegFaceDizzy
                        onClick={handleTogglePassword}
                        size={19}
                        color="#4682BE"
                        className="absolute right-3"
                      />
                    )}
                  </div>
                  <small className="text-[#E60A0A]  first-letter:uppercase">
                    {errors.cpassword?.message}
                  </small>
                </div>
                <div>
                  <div className="flex items-center gap-1 ">
                    <input
                      type="checkbox"
                      id="userAgreement"
                      {...register("tac")}
                      className="w-[16px] h-[16px]"
                    />
                    <label
                      htmlFor="userAgreement"
                      className="text-[#76848D] text-base select-none"
                    >
                      Terns & Condition
                    </label>
                  </div>
                  <small className="text-[#E60A0A]  first-letter:uppercase">
                    {errors.tac?.message}
                  </small>
                </div>

                <button
                  type="submit"
                  mode="primary"
                  rounded="md"
                  class="w-full  false  bg-blue-500 border-blue-500 text-white hover:border-blue-500 hover:bg-blue-700 border-[1px] flex justify-center items-center px-8 py-2 text-md rounded-md  "
                >
                  {" "}
                  Login
                  {loading ? "loading..." : "Signup"}
                </button>
              </div>
              <small className="text-sm text-gray-600 mt-3 block">
                Already have an account?
                <Link
                  href="/auth/login"
                  className="text-blue-500 hover:underline ml-1"
                >
                  Log in
                </Link>
              </small>
            </form>
          </div>
        </div>
      </section>
    </RequireGuest>
  );
};
export default signup;

"use client";
import { LuUser2 } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { FaRegFaceFlushed } from "react-icons/fa6";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaRegFaceDizzy } from "react-icons/fa6";
import { useState } from "react";
const fieldIsRequired = "this field is required";
const schemaSignup = yup.object({
  email: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .email("Invalid email format")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.com)?$/,
      "Invalid email format"
    ),
  password: yup.string().trim().required(fieldIsRequired),
});

const signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });

  console.log(errors);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <section>
      <div className="flex min-h-screen items-center justify-center  h-full px-3">
        <div className="w-full xsm:w-[400px]">
          <div className="py-3">
            <h6 className="  text-[#1C4E80]  text-[26px] font-medium">Login</h6>
            <small className="text-sm text-gray-600 mt-3 block">
              <Link
                href="/auth/forget-password"
                className="text-blue-500 hover:underline ml-1"
              >
                forgotten your password
              </Link>
            </small>
          </div>
          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="" className="text-[#36454F]">
                  Email<span className="text-[#E60A0A]"> *</span>{" "}
                </label>
                <div className="flex relative items-center w-full">
                  <input
                    autoComplete="off"
                    type="email"
                    required
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
              <button
                type="submit"
                className="bg-[#1C4E80] min-h-[46px] rounded-3xl text-white w-full "
              >
                submit
              </button>
            </div>
            <small className="text-sm text-gray-600 mt-3 block">
              Don't have an account?
              <Link
                href="/auth/signup"
                className="text-blue-500 hover:underline ml-1"
              >
                signup
              </Link>
            </small>
          </form>
        </div>
      </div>
    </section>
  );
};
export default signup;

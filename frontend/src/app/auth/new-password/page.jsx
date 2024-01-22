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
  password: yup
    .string()
    .trim()
    .required(fieldIsRequired)
    .min(8, "min length must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    ),
  cpassword: yup
    .string()
    .required(fieldIsRequired)
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  tac: yup.boolean().oneOf([true], "Please accept the terms and conditions"),
});

const Newpassword = () => {
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
            <h6 className="  text-[#1C4E80]  text-[26px] font-medium capitalize">
              new password
            </h6>
          </div>
          {/*  */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="" className="text-[#36454F] capitalize">
                  new Password<span className="text-[#E60A0A]"> *</span>{" "}
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
                  confrim Password<span className="text-[#E60A0A]"> *</span>{" "}
                </label>
                <div className="flex relative items-center w-full">
                  <input
                    autoComplete="off"
                    type={showPassword ? "text" : "password"}
                    {...register("cpassword")}
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
                  {errors.cpassword?.message}
                </small>
              </div>
              <button
                type="submit"
                className="bg-[#1C4E80] min-h-[46px] rounded-3xl text-white w-full "
              >
                Change password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Newpassword;

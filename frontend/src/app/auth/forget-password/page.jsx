"use client";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { ToastContainer, toast } from "react-toastify";

import { FORTGET_PASSWORD } from "../../graphql/mutations/auth";
import { useRouter } from "next/navigation";
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
});

const forgetPassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSignup),
    mode: "onTouched",
  });
  const [MutationFunction, { loading }] = useMutation(FORTGET_PASSWORD, {
    fetchPolicy: "no-cache",
    onCompleted: ({ forgetPassword }) => {
      toast.success(forgetPassword.message);
      reset();
      router.push("auth/login");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });

  const onSubmit = ({ email }) => {
    MutationFunction({
      variables: {
        email: email,
      },
    });
  };
  return (
    <section>
      <ToastContainer />
      <div className="flex min-h-screen items-center justify-center  h-full px-3">
        <div className="w-full xsm:w-[400px]">
          <div className="py-3">
            <h6 className="  text-[#1C4E80]  text-[26px] font-medium">
              Forget Password
            </h6>
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

              <button
                disabled={loading}
                type="submit"
                className="bg-[#1C4E80] min-h-[46px] rounded-3xl text-white w-full "
              >
                Forgot Password
              </button>
            </div>
            <small className="text-sm text-gray-600 mt-3 block">
              Go to ?
              <Link
                href="/auth/login"
                className="text-blue-500 hover:underline ml-1"
              >
                login
              </Link>
            </small>
          </form>
        </div>
      </div>
    </section>
  );
};
export default forgetPassword;

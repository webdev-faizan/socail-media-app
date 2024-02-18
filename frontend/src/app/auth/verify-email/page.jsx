"use client";
import { useMutation } from "@apollo/client";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { VERIFY_EMAIL } from "../../graphql/mutations/auth";
import { useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
const EmailVerificationComponent = () => {
  const searchParams = useSearchParams();
  const [mutateFunction, { loading }] = useMutation(VERIFY_EMAIL, {
    fetchPolicy: "no-cache",
    onCompleted: ({ emailVerification }) => {
      toast.success(emailVerification.message, {
        autoClose: 1500,
      });
      router.push("/auth/login");
    },
    onError: ({ message }) => {
      toast.error(message, {
        autoClose: 1500,
      });
    },
  });
  const VerifyEmail = async () => {
    const token = searchParams.get("token");
    mutateFunction({
      variables: {
        token,
      },
    });
  };
  return (
    <>
      <ToastContainer />
      <section className="h-screen flex justify-center items-center w-full bg-red-500">
        <div className="email-verification min-m-[369px] max-w-md bg-white rounded-lg shadow-md p-8">
          <div className="email-icon flex justify-center">
            <FaEnvelope className="text-blue-500" size={48} />
          </div>
          <h2 className="heading text-xl font-semibold text-gray-800 mt-4">
            Verify Your Email Address
          </h2>
          <div className="flex justify-center">
            <button
              disabled={loading}
              className="verify-email-btn bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-600"
              onClick={VerifyEmail}
            >
              Verify Email
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailVerificationComponent;

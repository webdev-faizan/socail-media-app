"use client";
import Avatar from "react-avatar";
import { FaCamera } from "react-icons/fa";
import ResponsiveLayoutWithSidebar from "../layout/ResponsiveLayoutWithSidebar";
import Cards from "../Components/Cards";
import { PROFILE_CHANGE } from "../graphql/mutations/profile";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_POST } from "../graphql/query/post";
import { GET_USER_PERSONAL_INFO } from "../graphql/query/profile";
import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const { data, refetch } = useQuery(GET_USER_PERSONAL_INFO);

  const { firstName, lastName, profile } = data?.getUserPersonalInfo || {};
  const [mutateFunction] = useMutation(PROFILE_CHANGE, {
    fetchPolicy: "no-cache",
    onCompleted: ({ profileChange }) => {
      refetch();
      toast.success(profileChange.message, {
        autoClose: 1500,
      });
    },
    onError: ({ message }) => {
      toast.error(message, {
        autoClose: 1500,
      });
    },
  });
  const handlerProfile = (e) => {
    mutateFunction({
      variables: {
        profile: e.target.files[0],
      },
    });
  };
  return (
    <>
      <ToastContainer />
      <ResponsiveLayoutWithSidebar />
      <div className="p-3 mt-[70px] md:mt-4 md:p-10">
        <div className="flex justify-center my-10 relative">
          <Avatar
            style={{
              border: "2px solid gray",
            }}
            src={`${profile}`}
            name={`${firstName ? firstName + " " : ""}${
              lastName ? lastName : ""
            }`}
            size={200}
            round={true}
          />

          <div className="absolute bottom-5  flex items-center bg-red-500 justify-center">
            <form encType="multipart/form-data" className="relative">
              <input
                type="file"
                multiple={false}
                onChange={handlerProfile}
                accept="Image/*"
                className="w-[25px] h-[22px] absolute z-10 opacity-0"
              />
              <FaCamera size={22} className="absolute" />
            </form>
          </div>
        </div>
        <div className="flex justify-center font-medium ">
          <h6>{firstName && firstName + " " + lastName && lastName}</h6>
        </div>

        <Cards query={GET_USER_POST} />
      </div>
    </>
  );
};

export default page;

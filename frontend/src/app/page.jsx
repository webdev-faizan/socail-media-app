"use client";
import { FaRegComment } from "react-icons/fa6";
import { FaShare, FaWindowClose } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";
import ResponsiveLayoutWithSidebar from "./layout/ResponsiveLayoutWithSidebar";
import Comments from "./Components/Comments";
export default function Home() {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [modalIsOpen]);
  return (
    <>
      <Comments modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <ResponsiveLayoutWithSidebar />
      <div className="p-3 mt-[70px] md:mt-12 md:p-10 flex m-auto  justify-center ">
        <div className="flex gap-10  justify-center md:justify-start flex-wrap">
          {[
            1,
            2,
            23,
            33,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            3,
            ,
            3,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            ,
            1,
          ].map(() => {
            return (
              <div className="max-w-sm relative bg-[#617f9c] border border-gray-200 rounded-lg shadow ">
                <div className=" ">
                  <div className="flex items-center p-2 ">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full object-center"
                        src="/image-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Neil Sims
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        email@windster.com
                      </p>
                    </div>
                  </div>
                </div>
                <a href="#">
                  <img className="rounded-t-lg" src="image-1.jpg" alt />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 darks:text-white">
                      Noteworthy technology acquisitions 2021
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 darks:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                  <div className="flex  justify-between cursor-pointer">
                    <div className="flex gap-1">
                      <AiOutlineLike size={20} />0
                    </div>
                    <div className="flex gap-1">
                      <FaRegComment size={20} onClick={openModal} />
                      1k
                    </div>
                    <div className="flex gap-1">
                      <FaShare size={20} />
                      1k
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

// fetch("/graphql", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     query: `
// query getalluser{
//   quotes{
//     name
//     email
//   }
// }  

// `,
//   }),
// });

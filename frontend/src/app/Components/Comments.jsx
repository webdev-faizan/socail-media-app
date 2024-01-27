import React from "react";
import Modal from "react-modal";
import { IoMdSend } from "react-icons/io";
import { FaWindowClose } from "react-icons/fa";

const Comments = ({ modalIsOpen, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <FaWindowClose
          size={30}
          className="mb-5 ml-auto"
          onClick={closeModal}
        />
        <div className=" max-w-sm ">
          <div className="w-full">
            <div className="flex justify-center items-center relative">
              <input
                type="text"
                className="border-[1px] h-[36px] w-[97%] rounded-md text-[#BDBDBD] focus:border-[#b4b4b4] p-3 border-[#D0D3E8] border-solid outline-none pr-8"
              />
              <IoMdSend size={20} className="absolute right-2" />
            </div>
          </div>
          <div className="flex  p-2 mt-5 ">
            <div className="flex-shrink-0">
              <img
                className="w-8 h-8 rounded-full object-center"
                src="/image-1.jpg"
                alt="Neil image"
              />
            </div>
            <div className="flex-1 min-w-0 ms-4">
              loremaskcnasc iosa ciosa jioas xjioas jxioasxjioasjxioasjx io
              loremaskcnasc iosa ciosa jioas xjioas jxioasxjioasjxioasjx io
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Comments;
const customStyles = {
  overlay: {
    zIndex: 50,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    background: "#617f9c",
    transform: "translate(-50%, -50%)",
    height: "100vh",
  },
};

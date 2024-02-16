import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const flip = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Modal = ({ handleClose, firstName = "", lastName = "" }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-orange-500 w-[90%] sm:w-500 h-300 p-10 md:p-20 flex justify-center flex-col "
        variants={flip}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h6 className="text-2xl capitalize text-center font-bold mb-4 text-nowrap">
          👋 {firstName + " " + lastName}
        </motion.h6>
        <motion.h6
          className="text-2xl font-bold mb-4 text-nowrap"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Thanks for the registration
        </motion.h6>
        <motion.p className="text-lg mb-4 ">
          Please click the button to verify your Email.
        </motion.p>

        <Link
          onClick={handleClose}
          href={"https://mail.google.com/mail/u/0/?tab=rm&ogbl"}
          target="_blank"
        >
          <motion.button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, bounce: 100 }}
          >
            {" "}
            Verify
          </motion.button>
        </Link>
      </motion.div>
    </Backdrop>
  );
};

export default Modal;

const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50  overflow-hidden grid place-content-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

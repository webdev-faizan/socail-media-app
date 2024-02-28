"use client";
import React from "react";
import { ShareSocial } from "react-share-social";
import Modal from "react-modal";
const ShareSocailMedial = ({ showShare, setShowShare, url }) => {
  const closeModal = () => {
    setShowShare(false);
  };
  return (
    <Modal
      isOpen={showShare}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="w-[560px]  ">
        <ShareSocial
          url={window.location.origin + url}
          style={style}
          socialTypes={["facebook", "twitter", "linkedin", "reddit"]}
        />
      </div>
    </Modal>
  );
};

export default ShareSocailMedial;
const style = {
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
  copyContainer: {
    border: "1px solid blue",
    background: "rgb(0,0,0,0.7)",
  },
  title: {
    color: "aquamarine",
    fontStyle: "italic",
  },
};

const customStyles = {
  overlay: {
    zIndex: 49,
    padding: "0",
    background: "unset",
  },
  content: {
    top: "50%",
    background: "unset",

    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
};

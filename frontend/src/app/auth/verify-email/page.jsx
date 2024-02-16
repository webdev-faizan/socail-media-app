import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

const EmailVerificationComponent = ({ onVerifyEmail }) => {
  return (
    <div className="email-verification bg-white rounded-lg shadow-md p-8">
      <div className="email-icon flex justify-center">
        <FaEnvelope className="text-blue-500" size={48} />
      </div>
      <h2 className="heading text-xl font-semibold text-gray-800 mt-4">
        Verify Your Email Address
      </h2>
      <button
        className="verify-email-btn bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-600"
        onClick={onVerifyEmail}
      >
        Verify Email
      </button>
    </div>
  );
};

export default EmailVerificationComponent;

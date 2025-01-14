import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      className="fixed top-0 right-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div className="relative bg-white rounded-lg shadow p-4 w-full max-w-md">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg p-2"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className="text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Are you sure you want to perform this action?
          </h3>
          <button
            onClick={onConfirm}
            className="text-white bg-red-600 hover:bg-red-800 p-2 rounded-lg"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={onClose}
            className="text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 p-2 rounded-lg ml-3"
          >
            No, cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

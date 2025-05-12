import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="modal-overlay absolute w-full h-full bg-black/50 top-0 left-0 place-content-center place-items-center"
            onClick={onClose}
        >
            <div
                className="modal-content h-100 bg-white shadow-md p-4 rounded-md flex flex-col justify-center items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header pb-2 w-full flex flex-row justify-end">
                    <button
                        className="modal-close text-2xl  rounded-full px-2  hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;

import React from 'react'
import {createPortal} from "react-dom"
import {AiOutlineClose} from "react-icons/ai"
const Modal = ({onClose,isOpen,children}) => {
  return createPortal(
    <>
    {isOpen && (
        <div className=" grid place-items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40">
          <div className=" relative z-50 min-h-[200px] min-w-[80%] bg-white p-4 m-auto">
              <div className="flex justify-end">
              <AiOutlineClose onClick={onClose} className="text-2xl self-end cursor-pointer"/> 
              </div>
              {children}
          </div>
        </div>
    )}
    </>
  ,document.getElementById("modal-root"))
}

export default Modal
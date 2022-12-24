import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  //   setShowModal: Dispatch<SetStateAction<false | 0 | -1 | 1 | "restart">>;
};
const Modal = ({ children }: ModalProps) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal") as HTMLElement;
    modalRoot.appendChild(elRef.current as HTMLDivElement);
    return () => {
      modalRoot.removeChild(elRef.current as HTMLDivElement);
    };
  }, []);
  return createPortal(
    <div
      className="w-screen h-screen bg-opacity-50 bg-[#000] absolute flex justify-center items-center"
      //   onClick={() => setShowModal(false)}
    >
      <div className="w-screen h-[14.25rem] tablet:h-[16.625rem] bg-semiDarkNavy flex flex-col justify-center items-center z-50">
        {children}
      </div>
    </div>,
    elRef.current
  );
};
export default Modal;

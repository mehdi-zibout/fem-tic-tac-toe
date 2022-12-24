import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
const Button = ({
  cType,
  cColor,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`text-darkNavy ${
        cType === "primary"
          ? "shadow-[inset_0px_-8px_0px_rgba(0,0,0,0.35)]  rounded-[15px] w-[25.625rem] text-hs pt-4 pb-6 "
          : "shadow-[inset_0px_-4px_0px_rgba(0,0,0,0.35)]  rounded-[10px] text-hxs w-fit p-4"
      }  ${
        cColor === "yellow"
          ? "bg-lightYellow hover:bg-lightYellowHover"
          : cType === "primary"
          ? "bg-lightBlue hover:bg-lightBlueHover"
          : "bg-silver hover:bg-silverHover"
      } transition ${className}`}
    >
      {children}
    </button>
  );
};

type ButtonProps = {
  cType: "primary" | "secondary";
  cColor: "yellow" | "blue";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default Button;

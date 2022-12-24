import type { DetailedHTMLProps, HTMLAttributes } from "react";

const Card = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={` rounded-[15px] shadow-[inset_0px_-8px_0px_rgba(0,0,0,0.35)]  ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

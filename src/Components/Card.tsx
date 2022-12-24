import type { DetailedHTMLProps, HTMLAttributes } from "react";

const Card = ({
  className,
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={`bg-semiDarkNavy rounded-[15px] p-6 shadow-[inset_0px_-8px_0px_rgba(0,0,0,0.35)] flex justify-center items-center flex-col ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

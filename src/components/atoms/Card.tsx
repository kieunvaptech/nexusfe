import { ReactNode, forwardRef } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement | null, Props>(function Card(
  { className, children },
  ref
) {
  return (
    <div
      ref={ref}
      className={`${className || ""} min-w-[600px] bg-white shadow-lg p-[20px] w-full rounded-[5px] border-[1px] border-[#DCDCDC]`}
    >
      {children}
    </div>
  );
});

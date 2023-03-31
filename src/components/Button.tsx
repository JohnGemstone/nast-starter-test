import Link from "next/link";
import { ReactNode } from "react";

const Button = ({
  children,
  className,
  invert = false,
  href,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  invert?: boolean;
  href?: string;
  onClick?: () => void;
}) => {
  const basicButton = (
    <div className="gradient-fill inline-block rounded-full ">
      <button
        className={` m-1 rounded-full py-[.75rem] px-[1.25rem] transition duration-500 ease-in-out group-hover:shadow-md ${
          invert ? "bg-white" : "bg-slate-900 group-hover:bg-transparent "
        }`}
      >
        <p
          className={` !pt-0 uppercase tracking-wider transition duration-500 ease-in-out text-sm  ${
            invert ? "font-semibold text-slate-900" : "font-medium text-white "
          }`}
        >
          {children}
        </p>
      </button>
    </div>
  );

  // check if first character of string is a #
  const isHash = (str: string) => {
    return str.charAt(0) === "#";
  };

  return (
    <div
      className={` relative inline-block ${className ? className : ""}`}
      onClick={onClick}
    >
      {href && !isHash(href) ? (
        <Link href={href} className="group rounded-full">
          {basicButton}
        </Link>
      ) : href && isHash(href) ? (
        <div className="group rounded-full"><a href={href}>{basicButton}</a></div>
      ) : (
        <div className="group rounded-full">{basicButton}</div>
      )}
    </div>
  );
};

export default Button;

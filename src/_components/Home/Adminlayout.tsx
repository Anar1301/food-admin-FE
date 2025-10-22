import React, { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Adminlayout = ({
  children,
  classname,
  classname2,
}: {
  classname?: string;
  children: ReactNode;
  classname2?: string;
}) => {
  return (
    <div className="flex max-w-[1440px]  ">
      <Sidebar className={classname} className2={classname2} />
      <div className="w-[1240px]">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Adminlayout;

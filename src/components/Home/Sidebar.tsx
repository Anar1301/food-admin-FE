import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { MdOutlineDashboard } from "react-icons/md";
import { FaTruck } from "react-icons/fa";
const Sidebar = ({
  className,
  className2,
}: {
  className2?: string;
  className?: string;
}) => {
  return (
    <div className="h-screen w-[205px] bg-[#FFFFFF]">
      <Link href="/">
        {" "}
        <div className="flex gap-2 mt-[36px] mx-5">
          <div>
            <img src="/Logo.png" className="h-10 w-10"></img>
          </div>
          <div>
            {" "}
            <div className="font-bold">NomNom</div>
            <div className="text-[12px] text-[#71717A]">Swift delivery</div>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-5 mt-10 items-center">
        <Link href="/">
          {" "}
          <Button className={className2}>
            <MdOutlineDashboard />
            Food menu
          </Button>
        </Link>

        <Link href="/orders">
          {" "}
          <Button className={className}>
            <FaTruck /> Orders
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

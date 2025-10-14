import Adminlayout from "@/components/Home/Adminlayout";
import { Calendarinput } from "@/components/Home/Datainput";
import { DialogCategory2 } from "@/components/Home/Ordercategory";
import { DataTableDemo } from "@/components/Home/Ordertable";

import React from "react";

const Orderpage = () => {
  return (
    <Adminlayout
      classname="w-[165px] bg-black text-white"
      classname2="w-[165px] bg-white text-black"
    >
      <div className="mt-[24px] ml-[24px] ">
        <div className="flex justify-between ">
          {" "}
          <div className="font-bold ">Orders</div>
          <div className="flex gap-4">
            {" "}
            <Calendarinput></Calendarinput>
            <DialogCategory2></DialogCategory2>
          </div>
        </div>
        <DataTableDemo></DataTableDemo>
      </div>
    </Adminlayout>
  );
};

export default Orderpage;

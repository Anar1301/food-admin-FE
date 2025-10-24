"use client";
import Adminlayout from "@/_components/Home/Adminlayout";
import { Calendarinput } from "@/_components/Home/Datainput";
import { DialogCategory2 } from "@/_components/Home/Ordercategory";
import Orderselect from "@/_components/Home/Orderselect";
import React, { useEffect, useState } from "react";
type Dishinfo = {
  categorid: string;
  name: string;
  ingredients: string;
  price: number;
  image: string;
};

type Foods = {
  count: number;
  food: Dishinfo;
};
type OrderfoodType = {
  _id: string;
  email: string;
  totalprice: number;
  foodOrderitems: Foods[];
  status: string;
  address: String;
};

const Orderpage = () => {
  const [Orderfoods, setOrderfoods] = useState<OrderfoodType[]>([]);

  const getOrderfoods = async () => {
    const result = await fetch("http://localhost:4000/api/orderfood");

    const responseData = await result.json();

    const { data } = responseData;

    setOrderfoods(data);
  };
  useEffect(() => {
    getOrderfoods();
  }, []);

  console.log({ Orderfoods });
  return (
    <Adminlayout
      classname="w-[165px] bg-black text-white"
      classname2="w-[165px] bg-white text-black"
    >
      <div className="mt-[24px] ml-[24px] ">
        <div className="flex justify-between ">
          <div className="font-bold ">Orders</div>
          <div className="flex gap-4">
            <Calendarinput></Calendarinput>
            <DialogCategory2></DialogCategory2>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        {Orderfoods.map((food) => (
          <div className="flex gap-4">
            <div>{food.email}</div>
            {food.foodOrderitems.map((item) => (
              <div>
                <div>{item.count}</div>
                <div>{item.food.name}</div>
              </div>
            ))}
            <div>{food.totalprice}</div>
            <div>{food.address}</div>
            <Orderselect food={food.status} id={food._id}></Orderselect>
          </div>
        ))}
      </div>
    </Adminlayout>
  );
};

export default Orderpage;

"use client";
import React, { useEffect, useState } from "react";

import { DialogDemo } from "./Dialog";

import Dishinfo from "./Dishinfo";
type categoryidType = {
  _id: string;
  name: string;
};
type Dish = {
  name: string;
  ingredients: string;
  price: number;
  category: string;
  image: string;
  _id: string;
  categorid: categoryidType;
};

const Ordercomp = ({
  dishes2,
  title,
  _id,
}: {
  title: string;
  _id: string;
  getCategories: Function;
  dishes2: Dish[];
}) => {
  console.log(dishes2);
  const Deletefoodinfo = async (id: string) => {
    confirm("Are you sure ?");
    await fetch("http://localhost:4000/api/food/delete", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
  };
  return (
    <div>
      <div className="bg-[#FFFFFF] mt-[24px] ml-[24px] max-w-[1440px] ">
        <div className="pt-4 pl-4 font-bold">
          {title} ({dishes2.length})
        </div>
        <div className="flex gap-7 flex-wrap w-[1440px] ml-[24px] ">
          <DialogDemo categorid={_id} title={title} />

          {dishes2.map((dish, index) => (
            <Dishinfo
              key={index}
              Deletefoodinfo={Deletefoodinfo}
              title={title}
              name={dish.name}
              price={dish.price}
              ingredients={dish.ingredients}
              _id={_id}
              image={dish.image}
              id={dish._id}
              categorname={dish.categorid.name}
            ></Dishinfo>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ordercomp;

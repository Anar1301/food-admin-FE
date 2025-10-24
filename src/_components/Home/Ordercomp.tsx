"use client";

import { DialogDemo } from "./Dialog";

import Dishinfo from "./Dishinfo";
import { Dish } from "@/lib/types";
import useFood from "../../Service/use-hook";

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
  const { getDishes, Deletefoodinfo } = useFood();
  return (
    <div>
      <div className="bg-[#FFFFFF] mt-[24px] ml-[24px] max-w-[1440px] ">
        <div className="pt-4 pl-4 font-bold">
          {title} ({dishes2.length})
        </div>
        <div className="flex gap-7 flex-wrap w-[1440px] ml-[24px] ">
          <DialogDemo
            refetchFoods={() => getDishes()}
            categorid={_id}
            title={title}
          ></DialogDemo>

          {dishes2.map((dish, index) => (
            <Dishinfo
              refetchFoods={() => getDishes()}
              getDishes={getDishes}
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

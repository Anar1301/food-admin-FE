import React from "react";

const Foodcontainer = ({
  title,
  price,
}: {
  price: string | number;
  title: string;
}) => {
  return (
    <div className="w-[270px] mt-[20px] border-2 rounded-md">
      <div className="card bg-[#FFFFFF] h-[240px] shadow-sm items-center">
        <div className="mt-[8px] mb-0">
          <img
            height={130}
            width={240}
            src="https://thumbs.dreamstime.com/b/unhealthy-fast-food-delivery-menu-featuring-assorted-burgers-cheeseburgers-nuggets-french-fries-soda-high-calorie-low-356045884.jpg"
          />
        </div>

        <div className="card mx-5 mt-2">
          <div className="flex gap-2 mt-0">
            {" "}
            <h2 className="card-title text-red-500 font-normal text-[14px]">
              {title}
            </h2>
            <p>${price}</p>
          </div>

          <p className="text-[12px] mt-2">
            A card component has a figure, a body part, and inside body there
          </p>
        </div>
      </div>
    </div>
  );
};

export default Foodcontainer;

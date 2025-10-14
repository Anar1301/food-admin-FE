import React from "react";
import { Button } from "../ui/button";
const Dishescategory = ({ category }: { category?: string }) => {
  return (
    <div className="">
      {" "}
      <Button className="bg-white text-black rounded-full border-1 border-black ">
        {category}
        <p className="bg-black text-white rounded-full  px-2">category</p>
      </Button>
    </div>
  );
};

export default Dishescategory;

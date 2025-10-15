"use client";
import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";

import { DialogDemo } from "./Dialog";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SelectDemo } from "./Select";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { FaTrashCan } from "react-icons/fa6";

const Ordercomp = ({ title, _id }: { title: string; _id: string }) => {
  type Dish = {
    name: string;
    ingredients: string;
    price: number;
    category: string;
    image: string;
    _id: string;
    categorid: string;
  };

  const [dishes, setDishes] = useState<Dish[]>([]);
  const getDishes = async () => {
    const result = await fetch("http://localhost:4000/api/food");
    const responseData = await result.json();

    const { data } = responseData;

    setDishes(data);
  };
  useEffect(() => {
    getDishes();
  }, []);
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
    await getDishes();
  };
  return (
    <div>
      <div className="bg-[#FFFFFF] mt-[24px] ml-[24px] max-w-[1440px] ">
        <div className="pt-4 pl-4 font-bold">{title}</div>
        <div className="flex gap-7 flex-wrap w-[1440px] ml-[24px] ">
          <DialogDemo getDishes={getDishes} id={_id} title={title}></DialogDemo>

          {dishes.map((dish, index) => (
            <div>
              {dish.categorid === _id && (
                <div
                  key={index}
                  className="w-[270px] mt-[20px] border-2 rounded-md"
                >
                  <div className="card bg-[#FFFFFF] h-[240px] shadow-sm items-center">
                    <div className=" mb-0 h-[130px] w-[240px] relative ">
                      <img
                        src={dish.image}
                        className="absolute inset-0 mt-4 w-[240px] h-[130px]"
                      />
                    </div>

                    <Dialog>
                      <form>
                        <DialogTrigger asChild>
                          <div className="h-[44px] w-[44px] bg-white flex items-center justify-center absolute top-20 left-47 rounded-full">
                            <FiEdit2 color="red" />
                          </div>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[472px]">
                          <DialogHeader>
                            <DialogTitle>Dishes info</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4">
                            <div className="grid gap-3 ">
                              <div className="flex gap-5 ">
                                <Label htmlFor="name-1" className="w-[100px]">
                                  Dish Name
                                </Label>
                                <Input
                                  id="name"
                                  name="name"
                                  defaultValue={dish.name}
                                  // onChange={nameChangeHandler}
                                />
                              </div>
                            </div>
                            <div className="grid gap-5">
                              <div className="flex gap-8 ">
                                <Label htmlFor="name-1" className="w-[100px]">
                                  Dish Category
                                </Label>
                                <SelectDemo title={title}></SelectDemo>
                              </div>
                            </div>
                          </div>
                          <FieldSet>
                            <FieldGroup>
                              <Field>
                                <div className="flex gap-5">
                                  <div>
                                    <FieldLabel htmlFor="checkout-7j9-optional-comments">
                                      Comments
                                    </FieldLabel>
                                  </div>
                                  <Input
                                    id="ingredients"
                                    name="ingredients"
                                    defaultValue={dish.ingredients}
                                    // onChange={ingredientsChangeHandler}
                                  />
                                </div>
                              </Field>
                            </FieldGroup>
                          </FieldSet>
                          <div className="flex gap-5 ">
                            <Label htmlFor="name-1" className="w-[100px]">
                              Price
                            </Label>
                            <Input
                              id="price"
                              name="price"
                              type="number"
                              defaultValue={dish.price}
                              // onChange={priceChangeHandler}
                            />
                          </div>

                          <FieldSet>
                            <FieldGroup>
                              <Field>
                                <div className="flex gap-4">
                                  <div>
                                    <FieldLabel
                                      htmlFor="checkout-7j9-optional-comments"
                                      className="w-fit "
                                    >
                                      Image
                                    </FieldLabel>
                                  </div>
                                  <div className="ml-10  h-[120px] w-[326px] bg-gray-400 relative flex items-center justify-center">
                                    <img
                                      className="absolute inset-0 h-full w-full object-contain"
                                      src={dish.image}
                                    />
                                    <input
                                      // onChange={fileChangeHandler}
                                      type="file"
                                      id="picture"
                                      className=" opacity-0 absolute inset-0"
                                    />
                                    Add image
                                  </div>
                                </div>
                              </Field>
                            </FieldGroup>
                          </FieldSet>
                          <DialogFooter className="mt-[36px]">
                            <div className="flex-1 flex justify-between">
                              <div>
                                <DialogClose asChild>
                                  <Button
                                    variant="outline"
                                    className="border-red-500 "
                                    onClick={() => Deletefoodinfo(dish._id)}
                                  >
                                    <FaTrashCan color="red" />
                                  </Button>
                                </DialogClose>
                              </div>
                              <Button type="submit">Save changes</Button>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </form>
                    </Dialog>

                    <div className="card mx-5 mt-6">
                      <div className="flex justify-between mt-0 w-[240px]">
                        <div className="  card-title text-[#EF4444] text-[14px] font-semibold">
                          {dish.name}
                        </div>
                        <div className="">${dish.price}</div>
                      </div>

                      <p className="text-[12px] mt-2">{dish.ingredients}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ordercomp;

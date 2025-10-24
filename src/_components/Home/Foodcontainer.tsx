"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { CiEdit } from "react-icons/ci";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { FaTrashCan } from "react-icons/fa6";
import { SelectDemo } from "./Select";
import useFood from "../../Service/use-hook";

const Foodcontainer = ({
  title,
  price,
  image,
  comment,
  id,
}: {
  price: string | number;
  id: string;
  title: string;
  image: string;
  comment: string;
}) => {
  const { Deletefoodinfo } = useFood();

  return (
    <div className="w-[270px] mt-[20px] border-2 rounded-md">
      <div className="card bg-[#FFFFFF] h-[240px] shadow-sm items-center">
        <div className="mt-[8px] mb-0">
          <img height={100} width={170} src={image} />
        </div>

        <Dialog>
          <form>
            <DialogTrigger asChild>
              <CiEdit className="h-10 w-10" />
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
                      defaultValue={title}
                      // onChange={nameChangeHandler}
                    />
                  </div>
                </div>
                <div className="grid gap-5">
                  <div className="  flex gap-3 ">
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
                      {" "}
                      <div>
                        {" "}
                        <FieldLabel htmlFor="checkout-7j9-optional-comments">
                          Comments
                        </FieldLabel>
                      </div>
                      <Input
                        id="ingredients"
                        name="ingredients"
                        defaultValue={comment}
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
                  defaultValue={price}
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
                          src={image}
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
                        onClick={() => Deletefoodinfo(id)}
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

        <div className="card mx-5 mt-2">
          <div className="flex gap-2 mt-0">
            {" "}
            <h2 className="card-title text-red-500 font-normal text-[14px]">
              {title}
            </h2>
            <p>${price}</p>
          </div>

          <p className="text-[12px] mt-2">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default Foodcontainer;

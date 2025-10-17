"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FiEdit2 } from "react-icons/fi";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Button } from "../ui/button";
import { FaTrashCan } from "react-icons/fa6";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Dishinfo = ({
  categorname,
  id,
  Deletefoodinfo,
  name,
  image,
  ingredients,
  price,
  title,
  _id,
}: {
  categorname: string;
  name: string;
  image: string;
  ingredients: string;
  price: number;
  title: string;
  _id: string;
  Deletefoodinfo: Function;
  id: string;
}) => {
  const [pev, setPev] = useState("");
  const [image2, setImage] = useState<string | File>(image);
  const [name2, setName] = useState<string>(name);
  const [price2, setPrice] = useState<number>(price);
  const [categorid, setCategorid] = useState<string>(_id);
  const [ingredients2, setIngredients] = useState<string>(ingredients);
  const newform = new FormData();

  newform.append("name", name2);
  newform.append("price", String(price2));
  if (image2 !== image) {
    newform.append("image", image2);
  }
  if (image2 === image) {
    newform.append("image", image);
  }
  newform.append("ingredients", ingredients2);
  newform.append("foodid", id);
  newform.append("categorid", categorid);
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      const filepev = URL.createObjectURL(file);
      setPev(filepev);
    }
  };

  const Editfood = async () => {
    console.log(name2, price2, categorid, ingredients2);
    await fetch("http://localhost:4000/api/food/edit", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: newform,
    });
    alert("Food Edited successfully!");
  };
  const [categories, setCategories] = useState<Category[]>([]);
  type Category = {
    _id: string;
    name: string;
  };

  const getCategories = async () => {
    const result = await fetch("http://localhost:4000/api/categories");
    const responseData = await result.json();

    const { data } = responseData;

    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const handleonselect = (value: string) => {
    setCategorid(value);
  };

  return (
    <div className="w-[270px] mt-[20px] border-2 rounded-md">
      <div className="card bg-[#FFFFFF] h-[240px] shadow-sm items-center">
        <div className=" mb-0 h-[130px] w-[240px] relative ">
          {image && (
            <img
              src={image}
              className="absolute inset-0 mt-4 w-[240px] h-[130px]"
            />
          )}
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
                <DialogTitle>Foods info</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3 ">
                  <div className="flex gap-5 ">
                    <Label htmlFor="name-1" className="w-[100px]">
                      Food Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-5">
                  <div className="flex gap-8 ">
                    <Label htmlFor="name-1" className="w-[100px]">
                      Food Category
                    </Label>
                    <Select onValueChange={(value) => handleonselect(value)}>
                      <SelectTrigger className="w-[288px]">
                        <SelectValue placeholder={categorname} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>{title} </SelectLabel>
                          {categories.map((categor) => (
                            <SelectItem key={categor.name} value={categor._id}>
                              {categor.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                        defaultValue={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
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
                  onChange={(e) => setPrice(Number(e.target.value))}
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
                        {image && (
                          <img
                            className="absolute inset-0 h-full w-full object-contain"
                            src={image}
                          />
                        )}
                        <input
                          onChange={fileChangeHandler}
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
                  <Button onClick={Editfood} type="submit">
                    Save changes
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

        <div className="card mx-5 mt-6">
          <div className="flex justify-between mt-0 w-[240px]">
            <div className="  card-title text-[#EF4444] text-[14px] font-semibold">
              {name}
            </div>
            <div className="">${price}</div>
          </div>

          <p className="text-[12px] mt-2">{ingredients}</p>
        </div>
      </div>
    </div>
  );
};

export default Dishinfo;

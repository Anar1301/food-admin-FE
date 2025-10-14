"use client";
import { Button } from "../ui/button";

import { FaTrashCan } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";

import { ChangeEvent, useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";

export function DialogDemo({
  getDishes,
  title,
  id,
}: {
  title: string | undefined;
  getDishes: Function;
  id: string;
}) {
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

  const [pev, setPev] = useState("");
  const [image, setImage] = useState<File | undefined>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [ingredients, setIngredients] = useState<string>("");
  // const [category, setCategory] = useState<string>("");

  const addFoodHandler = async () => {
    if (!name || !price || !image || !ingredients) {
      alert("All fields are required");
      return;
    }

    const form = new FormData();

    form.append("name", name);
    form.append("price", String(price));
    form.append("image", image); // File object
    form.append("ingredients", ingredients);
    form.append("category", ingredients);
    form.append("categorid", id);
    // form.append("category", category);

    try {
      const response = await fetch("http://localhost:4000/api/food", {
        method: "POST",
        mode: "no-cors",
        body: form,
      });
      await getDishes();
      console.log(response);
      alert("Food created successfully!");
      setName("");
      setPrice(0);
      setImage(undefined);
      setIngredients("");
      // setCategory("");
    } catch (error) {
      console.log(error);
      alert("Failed to create food");
    }
  };
  const nameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const priceChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };
  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      const file = e.target.files[0];
      const filepev = URL.createObjectURL(file);
      setPev(filepev);
    }
  };
  const ingredientsChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };
  // const categoryChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCategory(e.target.value);
  // };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="h-[240px] w-[270px]  mt-[24px]  outline-dashed outline-3 outline-[#EF4444]"
            variant="outline"
          >
            <div className="flex flex-col items-center">
              <img
                src="/icon.png

            "
                height={36}
                width={36}
              />
              <div className="mt-[24px] "> Add a new Dish to {title}</div>
            </div>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[472px]">
          <DialogHeader>
            <DialogTitle>Add new Dish to {title}</DialogTitle>
          </DialogHeader>

          <div className="flex gap-5  mt-8">
            <div className="">
              <Label htmlFor="name-1" className="w-[100px] mb-3">
                Food name
              </Label>
              <Input
                id="name"
                name="name"
                value={name}
                placeholder="Type food name"
                onChange={nameChangeHandler}
              />
            </div>
            <div>
              <Label htmlFor="name-1" className="w-[100px] mb-3">
                Food price
              </Label>
              <Input
                id="name"
                name="name"
                value={price}
                type="number"
                placeholder="Enter price ..."
                onChange={priceChangeHandler}
              />
            </div>
          </div>

          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="">
                  <div>
                    <FieldLabel
                      htmlFor="checkout-7j9-optional-comments"
                      className="mb-3"
                    >
                      Ingredients
                    </FieldLabel>
                  </div>
                  <Textarea
                    id="message"
                    placeholder="List ingredients ..."
                    required
                    className="min-h-[100px] resize-none sm:min-w-[300px]"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                  />
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>

          <FieldSet>
            <FieldGroup>
              <Field>
                <div className="">
                  <div>
                    <FieldLabel
                      htmlFor="checkout-7j9-optional-comments"
                      className="w-fit mb-3"
                    >
                      Food image
                    </FieldLabel>
                  </div>
                  <div className="min-h-[140px] resize-none sm:min-w-[300px] bg-[#2563EB33] relative aspect-video outline-dashed outline-2 flex justify-center items-center">
                    {pev && (
                      <img
                        className="absolute inset-0 h-full w-full  "
                        src={pev}
                      />
                    )}

                    <input
                      onChange={fileChangeHandler}
                      type="file"
                      id="picture"
                      className=" opacity-0 absolute inset-0"
                    />
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-[32px] w-[32px] bg-white flex items-center justify-center rounded-full">
                        <GrGallery />
                      </div>
                      Choose a file or drag & drop it here
                    </div>
                  </div>
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>
          <DialogFooter className="mt-[36px]">
            <div className="flex-1 flex justify-between">
              <div>
                <DialogClose asChild>
                  <Button variant="outline" className="border-red-500 ">
                    <FaTrashCan color="red" />
                  </Button>
                </DialogClose>
              </div>
              <Button onClick={addFoodHandler} type="submit">
                Save changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

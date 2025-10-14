"use client";
import { ChangeEvent, useEffect, useState } from "react";

import { DialogCategory } from "./Dialogcategory";
import Ordercomp from "./Ordercomp";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Alldishescategory = () => {
  const [newName, setNewName] = useState("");

  const createCategoryHandler = async () => {
    await fetch("http://localhost:4000/api/categories", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
      }),
    });
    await getCategories();
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

  const Deletebutton = async (id: string) => {
    confirm("Are you sure ?");
    await fetch("http://localhost:4000/api/categories/delete", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    await getCategories();
  };

  return (
    <div>
      <div className="h-[176px] w-screen bg-[#FFFFFF] rounded-md ml-[24px] mt-[24px] max-w-[1440px]">
        <div className="pl-[24px]">
          <div className="font-bold text-[20px]  pt-[24px]">
            Dishes category
          </div>

          <div className="mt-[16px] flex gap-2">
            {categories.map((category, index) => (
              <Button
                className="bg-white text-black rounded-full border-1 border-black "
                key={index}
              >
                {category.name}
                <p className="bg-black text-white rounded-full  px-2">
                  {categories.length}
                </p>
                <p
                  className="bg-red-400 rounded-full h-7 w-7 items-center flex justify-center"
                  onClick={() => Deletebutton(category._id)}
                >
                  X
                </p>
              </Button>
            ))}

            <Dialog>
              <DialogTrigger asChild>
                <img src="/icon.png" height={36} width={36} className="ml-4" />
              </DialogTrigger>

              <DialogContent className="sm:max-w-[472px]">
                <DialogHeader>
                  <DialogTitle>Add new category</DialogTitle>
                </DialogHeader>

                <div className="flex gap-5 flex-col ">
                  <Label htmlFor="name-1">Category name</Label>
                  <Input
                    id="name-1"
                    name="name"
                    value={newName}
                    placeholder="Type category name..."
                    onKeyDown={(e) =>
                      e.key === "Enter" &&
                      (createCategoryHandler(),
                      alert("Amjilttai ilgeele refresh hiinuu"))
                    }
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <DialogFooter className="mt-[36px]">
                  <div className="flex-1 flex justify-end">
                    <Button
                      onClick={() => (
                        createCategoryHandler(), alert("Daragdlaa")
                      )}
                      type="submit"
                    >
                      Add category
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      {categories.map((category: { name: string; _id: string }) => (
        <Ordercomp
          key={category.name}
          title={category.name}
          _id={category._id}
        ></Ordercomp>
      ))}
    </div>
  );
};

export default Alldishescategory;

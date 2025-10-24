"use client";
import { Category, Dish } from "@/lib/types";
import React, { useEffect, useState } from "react";

const useFood = () => {
  const [newName, setNewName] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtered, setFiltered] = useState<Category[]>([]);
  const [status, setStatus] = useState<boolean>(false);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const getDishes = async () => {
    const result = await fetch(
      "https://food-delivery-frontend-client-n86m.vercel.app/api/food"
    );

    const responseData = await result.json();

    const { data } = responseData;

    setDishes(data);
  };
  useEffect(() => {
    getDishes();
  }, []);

  const createCategoryHandler = async () => {
    await fetch(
      "https://food-delivery-frontend-client-n86m.vercel.app/api/categories",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
        }),
      }
    );
    await getCategories();
  };

  const getCategories = async () => {
    const result = await fetch(
      "https://food-delivery-frontend-client-n86m.vercel.app/api/categories"
    );
    const responseData = await result.json();

    const { data } = responseData;

    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const Deletebutton = async (id: string) => {
    if (confirm("Are you sure ?")) {
      await fetch(
        "https://food-delivery-frontend-client-n86m.vercel.app/api/categories/delete",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: id,
          }),
        }
      );
      await getCategories();
    }
  };
  function filteredcat(categorid: string) {
    const filteredcategory = categories.filter((e) => e._id === categorid);
    setFiltered(filteredcategory);

    setStatus(true);
  }

  const Deletefoodinfo = async (id: string) => {
    confirm("Are you sure ?");
    await fetch(
      "https://food-delivery-frontend-client-n86m.vercel.app/api/food/delete",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      }
    );
    await getDishes();
  };

  return {
    setStatus,
    setFiltered,
    setCategories,
    filteredcat,
    Deletebutton,
    getCategories,
    categories,
    dishes,
    setDishes,
    filtered,
    createCategoryHandler,
    setNewName,
    newName,
    getDishes,
    Deletefoodinfo,
    status,
  };
};

export default useFood;

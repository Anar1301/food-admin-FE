"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { useEffect, useState } from "react";

export function SelectDemo({ title }: { title: string }) {
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
  const handleonselect = (value: string) => {};
  return (
    <Select onValueChange={handleonselect}>
      <SelectTrigger className="w-[288px]">
        <SelectValue placeholder={title} />
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
  );
}

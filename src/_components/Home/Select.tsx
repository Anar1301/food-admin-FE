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

import useFood from "../../Service/use-hook";

export function SelectDemo({ title }: { title: string }) {
  const { categories } = useFood();

  return (
    <Select>
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

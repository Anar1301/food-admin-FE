"use client";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem } from "../ui/select";
import { SelectTrigger } from "@/components/ui/select";

const Orderselect = ({ food, id }: { food: any; id: string }) => {
  const [status, setStatus] = useState<string>(food);
  const handleonselect = (value: string) => {
    setStatus(value);
  };
  console.log("id", id);
  const PutDeliveryAddress = async () => {
    const result = await fetch(
      "http://localhost:4000/api/orderfood/editstatus",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          _id: id,
          status: status,
        }),
      }
    );
    const response = await result.json();
  };
  useEffect(() => {
    PutDeliveryAddress();
  }, [status]);

  return (
    <Select onValueChange={(value) => handleonselect(value)}>
      <SelectTrigger className="w-[180px]">
        <div>{status}</div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <div>{status}</div>
          <SelectItem value="DELIVERED">
            <div>DELIVERED</div>
          </SelectItem>
          <SelectItem value="CANCELED">
            <div>CANCELLED</div>
          </SelectItem>
          <SelectItem value="PENDING">
            <div>PENDING</div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Orderselect;

"use client";

import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type Order = {
  id: number;
  customer: string;
  food: string;
  date: string;
  total: number;
  address: string;
  state: "Pending" | "Delivered" | "Cancelled";
};

// 🧩 Fake JSON data
const fakeOrders: Order[] = [
  {
    id: 1,
    customer: "Amgalan",
    food: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    address: "СБД, 12-р хороо, СБД нэгдсэн эмнэлэгийн урд",
    state: "Pending",
  },
  {
    id: 2,
    customer: "test@gmail.com",
    food: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    address: "СБД, 12-р хороо, СБД нэгдсэн эмнэлэгийн урд",
    state: "Delivered",
  },
  {
    id: 3,
    customer: "test@gmail.com",
    food: "2 foods",
    date: "2024/12/20",
    total: 26.97,
    address: "СБД, 12-р хороо, СБД нэгдсэн эмнэлэгийн урд",
    state: "Cancelled",
  },
];

const OrderPage = () => {
  const [orders, setOrders] = useState<Order[]>(fakeOrders);
  const [selected, setSelected] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState({
    from: new Date(2023, 5, 13),
    to: new Date(2023, 6, 14),
  });

  // ✅ Хоёр товч → бүгдийг өөрчлөх
  const handleChangeStateAll = (newState: Order["state"]) => {
    setOrders((prev) =>
      prev.map((o) => (selected.includes(o.id) ? { ...o, state: newState } : o))
    );
  };

  // 🧩 Нэг мөрийн төлөв өөрчлөх
  const handleSingleChange = (id: number, newState: Order["state"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, state: newState } : o))
    );
  };

  // ✅ Checkbox toggle
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="font-bold text-xl">Orders</h1>
          <p className="text-sm text-gray-500">{orders.length} items</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-md px-3 py-1">
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {format(dateRange.from, "dd MMM yyyy")} -{" "}
              {format(dateRange.to, "dd MMM yyyy")}
            </span>
          </div>

          <Select
            onValueChange={(v) => handleChangeStateAll(v as Order["state"])}
          >
            <SelectTrigger className="w-[220px] bg-black text-white">
              <SelectValue placeholder="Change delivery state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3 w-10">
                <Checkbox
                  checked={selected.length === orders.length}
                  onCheckedChange={(checked) =>
                    setSelected(checked ? orders.map((o) => o.id) : [])
                  }
                />
              </th>
              <th className="p-3 w-10">№</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Food</th>
              <th className="p-3">Date</th>
              <th className="p-3">Total</th>
              <th className="p-3 w-[300px]">Delivery Address</th>
              <th className="p-3">Delivery state</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">
                  <Checkbox
                    checked={selected.includes(order.id)}
                    onCheckedChange={() => toggleSelect(order.id)}
                  />
                </td>
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.food}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 font-semibold">${order.total.toFixed(2)}</td>
                <td className="p-3 text-sm text-gray-700">{order.address}</td>
                <td className="p-3">
                  <Select
                    value={order.state}
                    onValueChange={(v) =>
                      handleSingleChange(order.id, v as Order["state"])
                    }
                  >
                    <SelectTrigger
                      className={`w-[120px] ${
                        order.state === "Pending"
                          ? "border-red-400 text-red-600"
                          : order.state === "Delivered"
                          ? "border-green-400 text-green-600"
                          : "border-gray-400 text-gray-600"
                      }`}
                    >
                      <SelectValue placeholder={order.state} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderPage;

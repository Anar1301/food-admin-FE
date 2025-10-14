"use client";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogCategory2() {
  const state = [
    { title: "Delivered" },
    { title: "Pending" },
    { title: "Cancelled" },
  ];
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="rounded-full">Change delivery state</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[364px]">
          <DialogHeader>
            <DialogTitle>Change delivery state</DialogTitle>
          </DialogHeader>

          <div className="flex gap-4 mx-[4px] mt-[24px] w-[100px]">
            {state.map((item) => (
              <Button
                key={item.title}
                className={`rounded-full bg-secondary text-black ${
                  item.title === "Delivered"
                    ? " bg-red-100 text-red-400 border-red-400 border-2"
                    : ""
                }`}
              >
                {item.title}
              </Button>
            ))}
          </div>
          <DialogFooter className="mt-[26px]">
            <Button type="submit" className="w-full rounded-full">
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

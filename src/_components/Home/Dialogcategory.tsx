"use client";
import { Button } from "@/_components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Input } from "@/_components/ui/input";
import { Label } from "@/_components/ui/label";

import { useState } from "react";

export function DialogCategory() {
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
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src="/icon.png
              
          "
          height={36}
          width={36}
          className="ml-4"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[472px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
        </DialogHeader>

        <div className="flex gap-5 flex-col ">
          {" "}
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
              onClick={() => (createCategoryHandler(), alert("Daragdlaa"))}
              type="submit"
            >
              Add category
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

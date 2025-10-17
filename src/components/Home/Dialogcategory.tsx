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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

export function DialogCategory() {
  const [newName, setNewName] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  // ✅ Fetch all categories
  const getCategories = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // ✅ Create new category
  const createCategoryHandler = async () => {
    if (!newName.trim()) return alert("Please enter a category name");

    try {
      const res = await fetch("http://localhost:4000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) throw new Error("Failed to create category");

      alert("Амжилттай нэмэгдлээ ✅");
      setNewName("");
      await getCategories(); // refresh list
    } catch (err) {
      console.error("Error creating category:", err);
      alert("Алдаа гарлаа ❌");
    }
  };

  // ✅ Delete category
  const deleteCategoryHandler = async (id: string) => {
    if (!confirm("Та энэ категори-г устгахдаа итгэлтэй байна уу?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/categories/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");

      alert("Категори устгагдлаа 🗑️");
      getCategories(); // refresh list
    } catch (err) {
      console.error("Error deleting category:", err);
      alert("Алдаа гарлаа ❌");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src="./icon.png"
          height={36}
          width={36}
          className="ml-4 cursor-pointer"
        />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[472px]">
        <DialogHeader>
          <DialogTitle>Manage categories</DialogTitle>
        </DialogHeader>

        {/* Add Category Section */}
        <div className="flex flex-col gap-3">
          <Label htmlFor="name-1">Category name</Label>
          <Input
            id="name-1"
            value={newName}
            placeholder="Type category name..."
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && createCategoryHandler()}
          />
          <Button onClick={createCategoryHandler}>Add category</Button>
        </div>

        {/* Category List with Delete Buttons */}
        <div className="mt-6 max-h-[240px] overflow-y-auto border-t pt-3">
          <div className="font-semibold mb-2">Existing categories</div>
          {categories.length > 0 ? (
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md"
                >
                  <span>{cat.name}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteCategoryHandler(cat.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No categories yet.</p>
          )}
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}

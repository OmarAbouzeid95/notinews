"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { Button } from "../ui/button";
import clsx from "clsx";

import { categories } from "@/data/homepage";
import { transitionAll } from "@/config/styles";

const CategoriesSection = () => {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(["home"])
  );

  const toggleCategory = (category: string) => {
    if (selectedCategories.has(category)) {
      // removing category from set
      setSelectedCategories((prev) => {
        const newSet = new Set(prev);
        newSet.delete(category);
        return newSet;
      });
    } else {
      setSelectedCategories((prev) => new Set(prev).add(category));
    }
  };

  return (
    <motion.div className={"max-w-md lg:max-w-2xl mx-auto"}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((item) => {
          const isSelected = selectedCategories.has(item.value);
          return (
            <div
              key={item.value}
              className={clsx(
                "flex items-center justify-between border p-4 border-gray-600 rounded-md hover:cursor-pointer",
                isSelected && "border-white",
                transitionAll
              )}
              onClick={() => toggleCategory(item.value)}>
              <div className="flex items-center gap-4">
                <item.icon size={24} />
                <p>{item.name}</p>
              </div>
              {isSelected && <CircleCheck size={18} color="white" />}
            </div>
          );
        })}
      </div>
      <Button
        className="flex items-center w-full my-10 max-w-[200px] mx-auto text-lg rounded-md bg-notificationApiGradient px-8 py-6 text-white disabled:bg-opacity-85"
        disabled={selectedCategories.size < 1}>
        Continue
      </Button>
    </motion.div>
  );
};

export default CategoriesSection;

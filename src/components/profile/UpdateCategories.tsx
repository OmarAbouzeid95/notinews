"use client";
import { useState } from "react";
import { categories } from "@/data/homepage";
import { MultiSelect } from "../ui/multiselect";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { updateUser } from "@/lib/userUtils";
import { toast } from "sonner";

const UpdateCategories: React.FC<{
  userCategories: string[];
}> = ({ userCategories }) => {
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(userCategories);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const updateUserCategories = async () => {
    setLoading(true);
    updateUser(params.id as string, { categories: selectedCategories })
      .then(() => {
        toast.success("Categories preferences updated!");
      })
      .catch((error) => {
        console.error("Error updating user preferences: ", error);
        toast.error("Oops, something went wrong! please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 border border-gray-600 rounded-md">
      <MultiSelect
        options={categories}
        onValueChange={setSelectedCategories}
        defaultValue={selectedCategories}
        placeholder="Choose your interests..."
        variant="inverted"
        animation={2}
        maxCount={3}
      />
      {selectedCategories.length === 0 && (
        <p className="text-red-500 my-2 text-sm">
          You need to select at least 1 category
        </p>
      )}
      <p className="mt-4 text-secondary">
        Choose the categories you&apos;re interested in.
      </p>
      <Button
        className="flex items-center mt-8 justify-center text-md font-normal gap-2 px-4 py-4 w-full text-white bg-notificationApiGradient hover:bg-secondaryCta transition-all ease-in-out duration-500"
        disabled={loading || selectedCategories.length < 1}
        onClick={updateUserCategories}>
        {loading ? (
          <Loader2 className="animate-spin infinite" size={64} />
        ) : (
          "Update"
        )}
      </Button>
    </div>
  );
};

export default UpdateCategories;

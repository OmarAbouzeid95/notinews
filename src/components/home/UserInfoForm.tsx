"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { nameRegex, emailRegex, phoneNumberRegex } from "@/config/forms";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { createUser } from "@/lib/userUtils";
import clsx from "clsx";

interface UserInfoFormProps {
  name: string;
  email: string;
  phoneNumber?: string | undefined;
}

export interface UserFormData extends UserInfoFormProps {
  categories: string[];
}

const UserInfoForm: React.FC<{ categories: string[] }> = ({ categories }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserInfoFormProps>();
  const [loading, setLoading] = useState<boolean>(false);
  const requiredField = "This field is required";

  const onSubmit: SubmitHandler<UserInfoFormProps> = (data) => {
    setLoading(true);
    createUser({ ...data, categories })
      .then((result) => {
        if (result.status === "success") {
          toast.success(<p>You&apos;re In! 🎉</p>, {
            description:
              "Thanks for joining our newsletter! Get ready to enjoy tailored updates, tips, and insights delivered straight to your inbox. Stay tuned!",
            action: {
              label: "test",
              onClick: () => "",
            },
          });
        }
      })
      .catch((error) => {
        toast(<p>You&apos;re In! 🎉</p>, {
          description:
            "Thanks for joining our newsletter! Get ready to enjoy tailored updates, tips, and insights delivered straight to your inbox. Stay tuned!",
          action: {
            label: "test",
            onClick: () => "",
          },
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <motion.div
      className="max-w-md mx-auto mt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-600 rounded-md p-6">
        <label htmlFor="name" className={clsx("block mb-2 text-base")}>
          Name
        </label>
        <Input
          type="text"
          id="name"
          className={clsx("mb-4", errors?.email?.type && "ring-red-500")}
          {...register("name", { required: true, pattern: nameRegex })}
        />
        {errors?.name?.type === "required" && (
          <p className={clsx("text-red-500 -mt-2 mb-4 text-left text-sm")}>
            {requiredField}
          </p>
        )}
        {errors?.name?.type === "pattern" && (
          <p className={clsx("text-red-500 -mt-2 mb-4 text-left text-sm")}>
            Please enter a valid name
          </p>
        )}
        <label htmlFor="email" className="block mb-2 text-base">
          Email
        </label>
        <Input
          type="email"
          id="email"
          className={clsx("mb-4", errors?.email?.type && "ring-red-500")}
          {...register("email", { required: true, pattern: emailRegex })}
        />
        {errors?.email?.type === "required" && (
          <p className={clsx("text-red-500 -mt-2 mb-4 text-left text-sm")}>
            {requiredField}
          </p>
        )}
        {errors?.email?.type === "pattern" && (
          <p className={clsx("text-red-500 -mt-2 mb-4 text-left text-sm")}>
            Please enter a valid email
          </p>
        )}
        <label htmlFor="phoneNumber" className="block mb-2 text-base">
          Phone number (Optional)
        </label>
        <Input
          type="text"
          id="phoneNumber"
          className={clsx("mb-4", errors?.email?.type && "ring-red-500")}
          {...register("phoneNumber", {
            required: false,
            pattern: phoneNumberRegex,
          })}
        />
        {errors?.phoneNumber?.type === "required" && (
          <p className={clsx("text-red-500 -mt-2 mb-4 text-left text-sm")}>
            {requiredField}
          </p>
        )}
        {errors?.phoneNumber?.type === "pattern" && (
          <p className={clsx("text-red-500 -mt-2 mb-4 text-left text-sm")}>
            Please enter a phone number in this format +1416xxxxxxx
          </p>
        )}
        <Button
          className="flex items-center mt-8 justify-center text-md font-normal gap-2 px-4 py-4 w-full text-white bg-notificationApiGradient hover:bg-secondaryCta transition-all ease-in-out duration-500"
          disabled={loading}>
          {loading ? (
            <Loader2 className="animate-spin infinite" size={64} />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default UserInfoForm;

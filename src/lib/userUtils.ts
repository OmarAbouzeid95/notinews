"use server";
import user, { User } from "@/models/User";
import dbConnect from "./dbConnect";
import { UserFormData } from "@/components/home/UserInfoForm";

export const createUser = async (data: UserFormData) => {
  await dbConnect();
  const newUser = new user(data);
  await newUser.save();
  return { status: "success" };
};

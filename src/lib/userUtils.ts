"use server";
import user, { User } from "@/models/User";
import dbConnect from "./dbConnect";
import { UserFormData } from "@/components/home/UserInfoForm";
import { sendNotificationEmail } from "./notificationApiUtils";

export const createUser = async (data: UserFormData) => {
  await dbConnect();
  // check if user email exists
  const foundUser: User | null = await user.findOne({ email: data.email });
  if (foundUser) {
    return { status: "success" };
  }
  const newUser: User = await new user(data).save();
  try {
    await sendNotificationEmail({
      notificationId: "welcome_email",
      user: {
        id: newUser.email,
        email: newUser.email,
        number: newUser.phoneNumber,
      },
      mergeTags: {
        name: newUser.name.split(" ")[0],
        userProfileLink: `${process.env.FRONTEND_URL}/profiles/${newUser._id}`,
      },
    });
  } catch (error) {
    console.error("Error sending welcome email: ", error);
  }
  return { status: "success" };
};

export const getUser = async (
  id: string
): Promise<{ foundUser: User | null; error: any }> => {
  try {
    await dbConnect();
    const foundUser: User | null = await user.findOne({ _id: id });
    return { foundUser, error: null };
  } catch (error) {
    console.error("Error fetching user: ", error);
    return { foundUser: null, error };
  }
};

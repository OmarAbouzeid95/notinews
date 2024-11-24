"use server";
import notificationapi from "notificationapi-node-server-sdk";
import { notificationapiEmail } from "@/types/notificationapi";

notificationapi.init(
  process.env.NOTIFICATION_API_CLIENT_ID as string,
  process.env.NOTIFICATION_API_CLIENT_SECRET as string
);

export const sendNotificationEmail = async (data: notificationapiEmail) => {
  await notificationapi.send({
    notificationId: "welcome_email",
    user: {
      id: data.user.id,
      email: data.user.email,
      number: data.user.number ?? "",
    },
    mergeTags: data.mergeTags,
  });
};

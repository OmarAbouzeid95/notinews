import NewsletterTemplate from "@/components/templates/newsletter";
import { CategoryResult } from "@/types/category";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

export const sendNewsletter = async (userInfo: {
  name: string;
  email: string;
  link: string;
  date: string;
  articles: CategoryResult[];
}) => {
  try {
    const { error } = await resend.emails.send({
      from: "Notinews <onboarding@resend.dev>",
      to: userInfo.email as string,
      subject: `Notinews [Newsletter]`,
      react: NewsletterTemplate(userInfo),
    });
    if (error) {
      throw Error(JSON.stringify(error));
    }
    return { status: "success" };
  } catch (error) {
    console.error(`Error sending newsletter ${error}`);
    return { status: "failure" };
  }
};

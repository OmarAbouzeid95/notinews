import dbConnect from "@/lib/dbConnect";
import User, { User as UserType } from "@/models/User";
import { getUserDailyNews } from "@/lib/userUtils";
import { lightFormat } from "date-fns";
import { sendNewsletter } from "@/lib/resend";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    await dbConnect();
    const users: UserType[] = await User.find();
    const today = lightFormat(new Date(), "yyyy-MM-dd");
    const promises = users.map((user: UserType) => {
      return new Promise(async (resolve) => {
        try {
          const { news } = await getUserDailyNews(user._id as string, today);
          if (news) {
            console.log(news);
            const filteredNews = news.slice(0, 3);
            await sendNewsletter({
              name:
                user.name.split(" ")[0].slice(0, 1).toUpperCase() +
                user.name.split(" ")[0].slice(1).toLowerCase(),
              email: user.email,
              date: new Date().toDateString(),
              link: `${process.env.FRONTEND_URL}/profiles/${user._id}/${today}`,
              articles: filteredNews,
            });
          }
          resolve("");
        } catch (error) {
          console.error("Error sending email :", error);
          resolve("");
        }
      });
    });
    Promise.allSettled(promises);
    return Response.json({ result: "success" });
  } catch (error) {
    console.error("Error processing newsletter send request: ", error);
    return Response.json({ result: "failure" });
  }
}

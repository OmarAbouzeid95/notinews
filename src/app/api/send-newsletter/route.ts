import dbConnect from "@/lib/dbConnect";
import User, { User as UserType } from "@/models/User";
import { sendNotificationEmail } from "@/lib/notificationApiUtils";
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
    const user: UserType | null = await User.findOne({
      email: "omaradham1995@gmail.com",
    });
    const today = lightFormat(new Date(), "yyyy-MM-dd");
    // const promises = users.map((user: UserType) => {
    //   return new Promise(async (resolve) => {
    //     try {
    //       const { news } = await getUserDailyNews(user._id as string, today);
    //       if (news) {
    //         console.log(news);
    //         const filteredNews = news.slice(0, 3);
    //         await sendNotificationEmail({
    //           notificationId: "daily_newsletter",
    //           user: {
    //             id: user.email,
    //             email: user.email,
    //             number: user.phoneNumber,
    //           },
    //           mergeTags: {
    //             name: user.name.split(" ")[0],
    //             date: new Date().toDateString(),
    //             link: `${process.env.FRONTEND_URL}/profiles/${user._id}/${today}`,
    //             article_1_title: filteredNews[0].title,
    //             article_1_abstract: filteredNews[0].abstract,
    //             article_1_img: filteredNews[0].imageUrl,
    //             article_1_link: filteredNews[0].url,
    //             article_2_title: filteredNews[1].title,
    //             article_2_abstract: filteredNews[1].abstract,
    //             article_2_img: filteredNews[0].imageUrl,
    //             article_2_link: filteredNews[1].url,
    //             article_3_title: filteredNews[2].title,
    //             article_3_abstract: filteredNews[2].abstract,
    //             article_3_img: filteredNews[0].imageUrl,
    //             article_3_link: filteredNews[2].url,
    //           },
    //         });
    //       }
    //       resolve("");
    //     } catch (error) {
    //       console.error("Error sending email :", error);
    //       resolve("");
    //     }
    //   });
    // });
    // Promise.allSettled(promises);
    if (!user) {
      throw new Error("user not found");
    }
    const { news } = await getUserDailyNews(user._id as string, today);
    if (news) {
      const filteredNews = news.slice(0, 3);
      console.log(
        JSON.stringify(
          {
            name:
              user.name.split(" ")[0].slice(0, 1).toUpperCase() +
              user.name.split(" ")[0].slice(1).toLowerCase(),
            email: user.email,
            date: new Date().toDateString(),
            link: `${process.env.FRONTEND_URL}/profiles/${user._id}/${today}`,
            articles: filteredNews,
          },
          null,
          2
        )
      );
      await sendNewsletter({
        name:
          user.name.split(" ")[0].slice(0, 1).toUpperCase() +
          user.name.split(" ")[0].slice(1).toLowerCase(),
        email: user.email,
        date: new Date().toDateString(),
        link: `${process.env.FRONTEND_URL}/profiles/${user._id}/${today}`,
        articles: filteredNews,
      });
      return Response.json({ result: "success" });
    }
    return Response.json({ reuslt: "failure" });
  } catch (error) {
    console.error("Error processing newsletter send request: ", error);
    return Response.json({ result: "failure" });
  }
}

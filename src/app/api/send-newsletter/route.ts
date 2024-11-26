import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { sendNotificationEmail } from "@/lib/notificationApiUtils";
import { getUserDailyNews } from "@/lib/userUtils";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const users = await User.find();
    const date = new Date();
    const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const promises = users.map((user) => {
      return new Promise(async (resolve) => {
        try {
          const { news } = await getUserDailyNews(user._id, today);
          if (news) {
            const filteredNews = news.slice(0, 3);
            await sendNotificationEmail({
              notificationId: "daily_newsletter",
              user: {
                id: user.email,
                email: user.email,
                number: user.number,
              },
              mergeTags: {
                name: user.name.split(" ")[0],
                date: new Date().toDateString(),
                link: `${process.env.FRONTEND_URL}/profiles/${user._id}/${today}`,
                article_1_title: filteredNews[0].title,
                article_1_abstract: filteredNews[0].abstract,
                article_1_link: filteredNews[0].url,
                article_2_title: filteredNews[1].title,
                article_2_abstract: filteredNews[1].abstract,
                article_2_link: filteredNews[1].url,
                article_3_title: filteredNews[2].title,
                article_3_abstract: filteredNews[2].abstract,
                article_3_link: filteredNews[2].url,
              },
            });
          }
          resolve("");
        } catch (error) {
          console.error("Error sending email :", error);
          resolve("");
        }
      });
    });
    Promise.all(promises);
    return Response.json({ result: "success" });
  } catch (error) {
    console.error("Error processing newsletter send request: ", error);
    return Response.json({ result: "failure" });
  }
}

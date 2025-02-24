import dbConnect from "@/lib/dbConnect";
import categoryModels from "@/models/categories";
import { CategoryResult } from "@/types/category";
import { categories } from "@/data/homepage";
import { lightFormat, subDays } from "date-fns";

type ArticleResponse = CategoryResult & {
  published_date: string;
  multimedia: Record<string, string>[] | null;
};

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    const today = lightFormat(new Date(), "yyyy-MM-dd");
    const prevWeek = lightFormat(subDays(today, 7), "yyyy-MM-dd");
    const promises = categories.map((category, index) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          fetch(
            `https://api.nytimes.com/svc/topstories/v2/${category.value}.json?api-key=${process.env.NYT_API_KEY}`
          )
            .then(async (result) => {
              const res = await result.json();
              const results: CategoryResult[] = res.results
                .filter(
                  (res: ArticleResponse) => res.section === category.value
                )
                .slice(0, 3)
                .map((result: ArticleResponse) => ({
                  section: result.section,
                  title: result.title,
                  abstract: result.abstract,
                  url: result.url,
                  publishedDate: result.published_date,
                  imageUrl: result.multimedia ? result.multimedia[1].url : "",
                }));
              await dbConnect();
              // adding new doc
              await new categoryModels[
                category.value as keyof typeof categoryModels
              ]({
                date: today,
                results,
              }).save();
              // deleting last week's doc
              await categoryModels[
                category.value as keyof typeof categoryModels
              ].deleteOne({ date: prevWeek });
              resolve(results);
            })
            .catch((error) => {
              console.error(
                `Error fetching ${category.name} category: `,
                error
              );
              resolve([]);
            });
        }, index * 12000);
      });
    });
    Promise.all(promises);
    return Response.json({ result: "success" });
  } catch (error) {
    console.error("Error processing request category fetch request: ", error);
    return Response.json({ result: "failure" });
  }
}

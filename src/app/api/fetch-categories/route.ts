import dbConnect from "@/lib/dbConnect";
import categoryModels from "@/models/categories";
import { CategoryResult } from "@/types/category";
import { categories } from "@/data/homepage";

export async function POST(request: Request) {
  try {
    const promises = categories.map((category, index) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch(
            `https://api.nytimes.com/svc/topstories/v2/${category.value}.json?api-key=${process.env.NYT_API_KEY}`
          )
            .then(async (result) => {
              const res = await result.json();
              const date = new Date();
              const today = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
              const results: CategoryResult[] = res.results
                .filter((res: any) => res.section === category.value)
                .slice(0, 3)
                .map((result: any) => ({
                  section: result.section,
                  title: result.title,
                  url: result.url,
                  publishedDate: result.published_date,
                  imageUrl: result.multimedia[1].url,
                }));
              await dbConnect();
              await new categoryModels[
                category.value as keyof typeof categoryModels
              ]({
                date: today,
                results,
              }).save();
              console.log("successfully fetched :", category.name);
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

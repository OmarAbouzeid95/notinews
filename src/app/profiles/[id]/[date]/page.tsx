import Section from "@/components/common/Section";
import Link from "next/link";
import NewsArticle from "@/components/common/NewsArticle";

import { getUser, getUserDailyNews } from "@/lib/userUtils";
import { redirect } from "next/navigation";

const DailyNewsletterPage = async ({
  params,
}: {
  params: { id: string; date: string };
}) => {
  const { id, date }: { id: string; date: string } = params;
  if (!id || id === "" || !date || date === "") {
    redirect("/");
  }
  const { foundUser: user, error } = await getUser(id);
  if (error || !user) {
    return (
      <Section title="" subHeading="" className="mt-16">
        <h1 className="font-semibold text-2xl mb-4 text-center">
          Oops, looks like this user doesn&apos;t exist
        </h1>
        <h2 className="text-lg text-center">
          Please signup on the{" "}
          <Link href="/" className="underline">
            home page
          </Link>
        </h2>
      </Section>
    );
  }

  const { news, error: newsError } = await getUserDailyNews(user.id, date);

  if (newsError) {
    return (
      <Section title="" subHeading="" className="mt-16">
        <h1 className="font-semibold text-2xl mb-4 text-center">
          Oops, Something went wrong from our side
        </h1>
        <h2 className="text-lg text-center">Please try to refresh the page.</h2>
      </Section>
    );
  }

  return (
    <Section title=" ">
      <div className="max-w-md lg:max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-3">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="text-secondary mb-8">
          Explore your personalized news for {new Date().toDateString()} and
          stay updated with what matters to you!
        </p>
        <div className="flex flex-col gap-4 divide-y divide-gray-600">
          {news?.map((article) => (
            <NewsArticle article={article} key={article.url} />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default DailyNewsletterPage;

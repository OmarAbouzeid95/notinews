import Link from "next/link";
import Image from "next/image";
import { CategoryResult } from "@/types/category";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/homepage";

const NewsArticle: React.FC<{ article: CategoryResult }> = ({ article }) => {
  return (
    <Link
      href={article.url}
      className="flex flex-col gap-4 pt-4"
      target="_blank">
      <div className="relative w-full h-44 md:h-52 overflow-hidden rounded-md">
        <Image
          src={article.imageUrl}
          alt={article.title}
          width={1200}
          height={750}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <h2 className="font-semibold text-xl">{article.title}</h2>
          <span className="block bg-slate-300 text-black font-bold tracking-wide text-[10px] px-4 rounded-full">
            {article.section === "world"
              ? "GENERAL"
              : article.section.toUpperCase()}
          </span>
        </div>
        <p className="text-sm text-secondary mb-4">
          {article.abstract.length > 200
            ? `${article.abstract.slice(0, 200)}...`
            : article.abstract}
        </p>
        <p className="text-sm flex items-center gap-1">
          Read more <ArrowUpRight size={15} strokeWidth={1.5} />
        </p>
      </div>
    </Link>
  );
};

export default NewsArticle;

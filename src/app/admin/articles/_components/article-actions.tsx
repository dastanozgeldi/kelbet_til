import { Button } from "@/components/ui/button";
import { Article } from "@prisma/client";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

export default function ArticleActions({ article }: { article: Article }) {
  return (
    <div className="flex items-center">
      <Button asChild variant="ghost" size="icon" className="h-8 w-8 p-0">
        <Link href={`/articles/${article.slug}`}>
          <EyeIcon />
        </Link>
      </Button>
    </div>
  );
}

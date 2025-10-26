import { Article } from "@prisma/client";
import { EyeIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteArticleDialog } from "./delete-article-dialog";
import { EditArticleDialog } from "./edit-article-dialog";

export default function ArticleActions({ article }: { article: Article }) {
  return (
    <div className="flex items-center">
      <Button asChild variant="ghost" size="icon" className="h-8 w-8 p-0">
        <Link href={`/articles/${article.slug}`}>
          <EyeIcon />
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="data-[state=open]:bg-muted flex h-8 w-8 p-0"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <EditArticleDialog article={article} />
          <DropdownMenuSeparator />
          <DeleteArticleDialog id={article.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

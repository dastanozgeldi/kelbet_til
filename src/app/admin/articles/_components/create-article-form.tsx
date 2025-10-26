import { useActionState, useEffect, useState } from "react";
import { createArticle } from "../actions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/rich-text-editor";

const initialState = {
  success: false,
  message: "",
};

export function CreateArticleForm({ onSuccess }: { onSuccess?: () => void }) {
  const [content, setContent] = useState("");

  const [state, formAction, pending] = useActionState(
    createArticle,
    initialState,
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      onSuccess?.();
    } else if (state?.message && !state?.success) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="title">Тақырыбы</Label>
        <Input id="title" name="title" placeholder="Тақырыбы" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="description">Сипаттамасы</Label>
        <Input id="description" name="description" placeholder="Сипаттамасы" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="status">Статусы</Label>
        <Select name="status">
          <SelectTrigger>
            <SelectValue placeholder="Статусы" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="DRAFT">Черновик</SelectItem>
            <SelectItem value="PUBLISHED">Публикация</SelectItem>
            <SelectItem value="ARCHIVED">Архив</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="content">Мазмұны</Label>
        <RichTextEditor content={content} onChange={setContent} />
      </div>

      <input type="hidden" name="content" value={content} />

      <Button disabled={pending}>Сақтау</Button>
    </form>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { renderMarkdown } from "@/lib/utils";

export const ExplanationDialog = ({ content }: { content: string }) => {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Мағынасы</DialogTitle>
          <DialogDescription>
            Жасанды интеллект кейде шындыққа жанаспайтын жауаптар беруі мүмкін.
          </DialogDescription>
        </DialogHeader>
        <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
      </DialogContent>
    </Dialog>
  );
};

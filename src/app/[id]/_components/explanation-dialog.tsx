import { Response } from "@/components/ai-elements/response";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
        <Response>{content}</Response>
      </DialogContent>
    </Dialog>
  );
};

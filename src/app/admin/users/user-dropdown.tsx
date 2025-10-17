import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User } from "next-auth";
import { MoreHorizontalIcon } from "lucide-react";

export const UserDropdown = ({ user }: { user: User }) => {
  const isAdmin = user.role === "ADMIN";

  const toggleAdmin = async () => {
    const res = await fetch("/api/assign-admin", {
      method: "POST",
      body: JSON.stringify({ id: user.id, role: isAdmin ? "USER" : "ADMIN" }),
    });

    if (res.ok) {
      return toast.success(
        `Админ сәтті ${isAdmin ? "тәркіленді" : "тағайындалды"}`,
      );
    }

    toast.success("Админді өзгертуде ақаулық туындады");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Меню</span>
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Әрекеттер</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleAdmin}>
          {isAdmin ? "Қолданушы" : "Админ"} қылу
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

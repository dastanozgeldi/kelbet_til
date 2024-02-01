import React from "react";
import { MoreHorizontal } from "lucide-react";
import { type User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const UserDropdown = ({ user }: { user: User }) => {
  const { toast } = useToast();

  // Reverse the role of the user
  const isAdmin = user.role === "ADMIN";

  const handleClick = async () => {
    const res = await fetch("/api/assign-admin", {
      method: "POST",
      body: JSON.stringify({ id: user.id, role: isAdmin ? "USER" : "ADMIN" }),
    });

    if (res.ok) {
      return toast({
        title: `Админ сәтті ${isAdmin ? "тәркіленді" : "тағайындалды"}`,
        description: `Ендігі ${user.name} шығармаларды қосып, жоя алады.`,
      });
    }

    toast({
      title: "Қате",
      description: res.statusText,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Меню</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Әрекеттер</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleClick}>
          {isAdmin ? "Қолданушы" : "Админ"} қылу
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

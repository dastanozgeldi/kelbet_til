import React from "react";
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
import { Icons } from "@/components/icons";

export const UserDropdown = ({ user }: { user: User }) => {
  const { toast } = useToast();

  // Reverse the role of the user
  const isAdmin = user.role === "ADMIN";

  const toggleAdmin = async () => {
    const res = await fetch("/api/assign-admin", {
      method: "POST",
      body: JSON.stringify({ id: user.id, role: isAdmin ? "USER" : "ADMIN" }),
    });

    if (res.ok) {
      return toast({
        title: `Админ сәтті ${isAdmin ? "тәркіленді" : "тағайындалды"}`,
      });
    }

    toast({
      title: "Қате",
      description: res.statusText,
    });
  };

  const toggleAI = async () => {
    const res = await fetch("/api/ai", {
      method: "PATCH",
      body: JSON.stringify({ id: user.id, canUseAI: user.canUseAI }),
    });

    if (res.ok) {
      return toast({
        title: `ЖИ сәтті ${user.canUseAI ? "тәркіленді" : "берілді"}`,
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
          <Icons.more className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Әрекеттер</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleAdmin}>
          {isAdmin ? "Қолданушы" : "Админ"} қылу
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleAI}>
          {user.canUseAI ? "ЖИ тәркілеу" : "ЖИ беру"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

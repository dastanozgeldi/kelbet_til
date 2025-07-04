import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { User } from "next-auth";

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

  const toggleAI = async () => {
    const res = await fetch("/api/ai", {
      method: "PATCH",
      body: JSON.stringify({ id: user.id, canUseAI: user.canUseAI }),
    });

    if (res.ok) {
      return toast.success(
        `ЖИ сәтті ${user.canUseAI ? "тәркіленді" : "берілді"}`,
      );
    }

    toast.success("Құқықтарды өзгертуде ақаулық туындады");
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

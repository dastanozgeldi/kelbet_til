"use client";

import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createArticle } from "../actions";

export default function Editor() {
  const [post, setPost] = useState("");

  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col gap-3 py-8">
      
    </div>
  );
}

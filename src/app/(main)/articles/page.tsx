"use client";

import { PageHeader } from "../_components/page-header";
import RichTextEditor from "@/components/rich-text-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page() {
  const [post, setPost] = useState("");

  return (
    <>
      <PageHeader title="Мақалалар" />

      <div className="mx-auto h-full w-full max-w-3xl py-8 flex flex-col gap-3">
        <RichTextEditor content={post} onChange={setPost} />

        <Button className="self-end w-32" onClick={() => console.log(post)}>Save</Button>
      </div>
    </>
  );
}

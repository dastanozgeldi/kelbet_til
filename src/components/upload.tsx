"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { useState } from "react";
import { Progress } from "./ui/progress";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export const Upload = ({ data, setData }: { data: any; setData: any }) => {
  const [file, setFile] = useState<File>();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <Label htmlFor="work-file">Шығарма</Label>
      <div className="flex items-center gap-3">
        <div className="grid w-full items-center gap-1.5">
          <Input
            id="work-file"
            type="file"
            onChange={(e) => {
              setUploadProgress(0);
              setFile(e.target.files?.[0]);
            }}
          />
        </div>

        <Button
          // if we don't specify the type, it will be a submit button inside a form
          type="button"
          disabled={!file || uploadProgress > 0}
          onClick={async () => {
            // reset previous files if any
            setData({ ...data, fileUrl: "" });

            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  setUploadProgress(progress);
                },
              });
              // you can run some server action or api here
              // to add the necessary data to your database
              setData({ ...data, fileUrl: res.url });
              console.log(res);
            }
          }}
        >
          Жүктеу
        </Button>
      </div>

      {/* Upload Progress */}
      <div className="my-3">
        {uploadProgress > 0 && uploadProgress < 100 && (
          <Progress value={uploadProgress} />
        )}
      </div>
    </div>
  );
};

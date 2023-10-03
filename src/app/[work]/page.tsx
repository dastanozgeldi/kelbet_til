"use client";
import { PDFBook } from "@/components/pdf-book";
import { pdfjs } from "react-pdf";
// import data from "../../../public/works.json";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function Page({ params }: { params: { work: string } }) {
  const work = decodeURIComponent(params.work);
  const folder = work.split("=")[0];
  const name = work.split("=")[1];

  return (
    <div className="my-6">
      <div className="mb-6">
        <h1 className="text-3xl my-2 md:text-4xl font-bold">{name}</h1>
        <hr className="border-0 max-w-[36px] h-[6px] bg-[#6C63FF]" />
      </div>
      <PDFBook file={`/works/${folder}/${name}.pdf`} />
    </div>
  );
}

// export async function generateStaticParams() {
//   const result = [];

//   for (const key in data) {
//     if (data.hasOwnProperty(key)) {
//       const namesArray = data[key as keyof typeof data].map((obj) => ({
//         name: `${obj.name}`,
//       }));
//       result.push(...namesArray);
//     }
//   }

//   return result;
// }

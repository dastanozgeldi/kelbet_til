import { Metadata } from "next";
import { PageHeader } from "../_components/page-header";

export const metadata: Metadata = {
  title: "Мақалалар",
};

export default async function Page() {
  return (
    <>
      <PageHeader title="Мақалалар" />
    </>
  );
}

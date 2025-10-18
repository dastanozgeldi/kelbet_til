import { BookStatus } from "@prisma/client";

export default function isBookActive(status: BookStatus) {
  return status === "ACTIVE";
}

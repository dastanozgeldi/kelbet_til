import { LogInIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signIn } from "@/server/auth";

export default function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" variant="outline">
        Кіру
        <LogInIcon className="size-4" />
      </Button>
    </form>
  );
}

import { signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <LogOut />
      Log out
    </form>
  );
}

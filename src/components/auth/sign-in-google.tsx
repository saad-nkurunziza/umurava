import { signIn } from "@/lib/auth";
import { Button } from "../ui/button";
import Icons from "@/utils/icons";

export default function SignInGoogle() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="w-full h-12 rounded-lg">
        <Icons.google className="mr-2 h-4 w-4" />
        Signin with Google
      </Button>
    </form>
  );
}

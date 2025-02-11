import { signIn } from "@/lib/auth";
import { Button } from "../ui/button";
import Icons from "@/utils/icons";

export default function SignInGithub() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button
        type="submit"
        variant="outline"
        className="w-full h-12 rounded-lg"
      >
        <Icons.github className="mr-2 h-4 w-4" />
        Sign in with GitHub
      </Button>
    </form>
  );
}

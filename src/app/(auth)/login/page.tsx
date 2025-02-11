import SignInGithub from "@/components/auth/sign-in-github";
import SignInGoogle from "@/components/auth/sign-in-google";

export default function AuthPage() {
  return (
    <div className="p-12 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-lg ">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-start text-start">
          <h1 className="font-semibold">Welcome</h1>
          <p className="text-balance mt-3 text-muted-foreground">
            Continue to your Umurava account
          </p>
        </div>

        <div className="flex flex-col gap-6 mt-3 ">
          <SignInGithub />
          <SignInGoogle />
        </div>
      </div>
    </div>
  );
}

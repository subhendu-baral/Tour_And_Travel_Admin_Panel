import { LoginForm } from "@/components/auth/login-form";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm />
    </div>
  );
}

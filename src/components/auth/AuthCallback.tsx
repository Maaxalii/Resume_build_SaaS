import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function AuthCallback() {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the code from the URL
        const code = new URL(window.location.href).searchParams.get("code");

        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
          navigate("/dashboard");
        }
      } catch (err) {
        console.error("Error during auth callback:", err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => navigate("/signin"), 3000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {error ? "Authentication Error" : "Authenticating..."}
          </CardTitle>
          <CardDescription className="text-center">
            {error
              ? "There was a problem authenticating your account. Redirecting to sign in..."
              : "Please wait while we authenticate your account."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          {!error && <Loader2 className="h-8 w-8 animate-spin text-primary" />}
        </CardContent>
      </Card>
    </div>
  );
}

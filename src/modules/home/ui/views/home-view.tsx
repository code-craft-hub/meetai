"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const HomeView = () => {
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  const signOut = () => {
    setLoading(true);
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          setLoading(false);
        },
      },
    });
  };
  const router = useRouter();
  if (!session) return <p>Loading...</p>;

  return (
    <div className="flex flex-col p-4 gap-y-4">
      <p>Logged in as {session.user.name}</p>
      <Button onClick={signOut} disabled={loading}>
        Sign out
        {loading && <Loader className="animate-spin" />}
      </Button>
    </div>
  );
};

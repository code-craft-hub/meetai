"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth.client";
import React, { useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const onSubmit = async () => {
    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          console.log(typeof ctx.error.message);
          console.log(ctx.error.message);
          if (typeof ctx.error.message === "object")
            toast.error(JSON.stringify(ctx.error.message));
          else toast.error(ctx.error.message);
        },
      }
    );
  };
  return (
    <div className="space-y-4 p-8 mx-auto max-w-md flex flex-col h-screen ">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create User</Button>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default Home;

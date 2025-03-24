"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white font-sans">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome Back</CardTitle>
          <CardDescription className="text-lg">
            Please log in to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center flex gap-3">
          <Button
            variant="default"
            className="bg-white text-black hover:bg-gray-200 mb-4"
            onClick={() => signIn("google")}
          >
            Login with Google
          </Button>
          <Button
            variant="default"
            className="bg-white text-black hover:bg-gray-200"
            onClick={() => signIn("github")}
          >
            Login with Github
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

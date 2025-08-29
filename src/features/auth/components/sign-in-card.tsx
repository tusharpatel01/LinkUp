import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGithub } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { signInFlow } from "../types";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps{
  setState:(state:signInFlow)=>void;
}

const SignInCard = ({setState}:SignInCardProps) => {
   const { signIn } = useAuthActions();
   const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    const[pending,setPending]=useState(false);
    const[error,setError]=useState("");

    const onPasswordSignIn=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      setPending(true);
      signIn("password",{email,password,flow:"signIn"})
      .catch(()=>{
        setError("invalid email or password");

      })
      .finally(()=>{
        setPending(false);

      })

    }

    const OnproviderSignIn=(value:"github"|"google")=>{
      setPending(true);
      signIn(value)
      .finally(()=>{setPending(false)});
    }
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-[400px] p-8 shadow-lg rounded-2xl">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg">Login to continue</CardTitle>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4"/>
            <p>{error}</p>
          </div>
        )}

        <CardDescription>Login with same or different account</CardDescription>

        <CardContent className=" space-y-5 px-0 pb-0">
          <form onSubmit={onPasswordSignIn
          } 
           className="space-y-2.5">
            <Input
              value={email}
             onChange={(e) =>setEmail( e.target.value)}
              disabled={pending}
              required
              placeholder="email"
              type="email"
            />

            <Input
              className="w-full "
              value={password}
             onChange={(e) =>setPassword( e.target.value)}
              disabled={pending}
              required
              placeholder="password"
            />
            <Button
              className="w-full "
              type="submit"
              disabled={pending}
              size={"lg"}
            >
              continue
            </Button>
          </form>

          <Separator/>

          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={pending}
               onClick={() => OnproviderSignIn("google")}
              variant={"outline"}
              size={"lg"}
              className="w-full relative "
            >
              <FcGoogle className="size-5 absolute  top-2.5 left-2.5" />
              continue with google
            </Button>

            <Button
              disabled={pending}
              onClick={() => OnproviderSignIn("github")}
              variant={"outline"}
              size={"lg"}
              className="w-full relative "
            >
              <FaGithub className="size-5 absolute top-2.5 left-2.5" />
              continue with github
            </Button>
            <p className="text-sm pt-2">
              don&apos;t have an account? <span onClick={()=>setState("signUp")} className="text-sky-600 font-semibold hover:underline cursor-pointer">SignUp</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInCard;

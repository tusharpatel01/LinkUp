import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

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
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps{
  setState:(state:signInFlow)=>void;
}



const SignUpCard = ({setState}:SignUpCardProps) => {

  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const[pending,setPending]=useState(false);
  const[error,setError]=useState("");
  const[name,setName]=useState("");

  const { signIn } = useAuthActions();

  const OnPasswordSignUp=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(password!=confirmPassword){
      setError("password do not matching")
      return;
    }
    setPending(true);
    signIn("password",{name,email,password,flow:"signUp"})
    .catch(()=>{
      setError("something went wrong")

    })
    .finally(()=>{
      setPending(false);
    })

  }

   const OnproviderSignUp=(value:"github"|"google")=>{
      setPending(true);
      signIn(value)
      .finally(()=>{setPending(false)});
    }


  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-[400px] p-8 shadow-lg rounded-2xl">
        <CardHeader className="px-0 pt-0">
          <CardTitle className="text-lg">signUp to continue</CardTitle>
        </CardHeader>
         {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4"/>
            <p>{error}</p>
          </div>
        )}

        <CardDescription>signUp with same or different account</CardDescription>

        <CardContent className=" space-y-5 px-0 pb-0">
          <form onSubmit={OnPasswordSignUp} className="space-y-2.5">
           <Input
            disabled={pending}
            value={name}
            onChange={({ target }) => setName(target.value)}
            placeholder="Full name"
            required
          />
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
              onChange={(e) => setPassword(e.target.value)}
              disabled={pending}
              required
              placeholder="password"
              type="password"
            />

             <Input
              className="w-full "
              value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={pending}
              required
              placeholder="confirmPassword"
              type="password"
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
              onClick={() => OnproviderSignUp("google")}
              variant={"outline"}
              size={"lg"}
              className="w-full relative "
            >
              <FcGoogle className="size-5 absolute  top-2.5 left-2.5" />
              continue with google
            </Button>

            <Button
              disabled={pending}
              onClick={() => OnproviderSignUp("github")}
              variant={"outline"}
              size={"lg"}
              className="w-full relative "
            >
              <FaGithub className="size-5 absolute top-2.5 left-2.5" />
              continue with github
            </Button>
            <p className="text-sm pt-2">
             Already have an account ? <span onClick={()=>setState("signIn")} className="text-sky-600 font-semibold hover:underline cursor-pointer">SignIn</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpCard;

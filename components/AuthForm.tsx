"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
    contactNumber: type === "sign-up" ? z.string().min(10).max(15) : z.string().optional(),
    collegeName: type === "sign-up" ? z.string().min(2) : z.string().optional(),
    degree: type === "sign-up" ? z.string().min(2) : z.string().optional(),
    branch: type === "sign-up" ? z.string().min(2) : z.string().optional(),
    yearOfStudy: type === "sign-up" ? z.string().min(1) : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      collegeName: "",
      degree: "",
      branch: "",
      yearOfStudy: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password, contactNumber, collegeName, degree, branch, yearOfStudy } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
          contactNumber: contactNumber!,
          collegeName: collegeName!,
          degree: degree!,
          branch: branch!,
          yearOfStudy: yearOfStudy!,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully! Please upload your CV.");
        router.push("/profile/cv-upload");
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <>
                <FormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="Your Full Name"
                  type="text"
                />

                <FormField
                  control={form.control}
                  name="contactNumber"
                  label="Contact Number"
                  placeholder="Your Phone Number"
                  type="tel"
                />

                <FormField
                  control={form.control}
                  name="collegeName"
                  label="College Name"
                  placeholder="Your College/University"
                  type="text"
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="degree"
                    label="Degree"
                    placeholder="B.Tech, M.Tech, etc."
                    type="text"
                  />

                  <FormField
                    control={form.control}
                    name="branch"
                    label="Branch"
                    placeholder="CSE, ECE, etc."
                    type="text"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="yearOfStudy"
                  label="Year of Study"
                  placeholder="1st, 2nd, 3rd, 4th Year"
                  type="text"
                />
              </>
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password (min 6 characters)"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

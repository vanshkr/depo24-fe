import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/ui/custom/Loader";
import { Link, useNavigate } from "react-router-dom";
import { signInAccount } from "../../lib/axios/api";
import { useAuth } from "@/lib/context/AuthContext";

const SignIn = () => {
  const { checkAuthUser, isLoading: isUserLoading } = useAuth();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  async function onSubmit(userData) {
    try {
      await signInAccount(userData);
      const isLoggedIn = await checkAuthUser();
      if (!isLoggedIn) {
        throw new Error("Authentication failed. Please try again. ");
      }
      toast({
        title: "Signed in successfully. ",
      });
      navigate("/");
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: err.message,
      });
    } finally {
      form.reset();
    }
  }
  return (
    <Form {...form}>
      <div className="flex flex-col">
        <img
          src="/assets/images/logo.png"
          alt="logo"
          width={200}
          className="self-start"
        />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Sign in to your account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Welcome back!, Please enter your details.{" "}
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder=" johndoe@example.com"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="shad-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-y-4">
            <Button className="shad-button_primary " type="submit">
              {isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-light-2/80 text-center text-small-regular">
              Don't have an account?{" "}
              <Link
                className="text-bold-semibold text-primary-500 ml-1 underline"
                to="/signUp"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;

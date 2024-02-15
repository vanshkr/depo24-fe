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
import { signUpFormSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "@/components/ui/custom/Loader";
import { Link, useNavigate } from "react-router-dom";
import { signUpAccount } from "@/lib/axios/api";
import { useAuth } from "@/lib/context/AuthContext";

const SignUp = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useAuth();
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();
  async function onSubmit(userData) {
    try {
      await signUpAccount(userData);
      const isLoggedIn = await checkAuthUser();
      if (!isLoggedIn) {
        throw new Error("Authentication failed. Please try again. ");
      }
      toast({
        title: "Signed up successfully. ",
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
          className="self-start mt-28 lg:mt-0  "
        />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use chat sphere, Please enter your details.{" "}
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="John Doe"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
                "Sign Up"
              )}
            </Button>
            <p className="text-light-2/80 text-center text-small-regular">
              Already have an account?{" "}
              <Link
                className="text-bold-semibold text-primary-500 ml-1 underline"
                to="/signIn"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;

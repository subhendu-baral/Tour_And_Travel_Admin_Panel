"use client";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import csrf from "@/lib/csrf";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(1, {
    message: "Please Enter your password",
  }),
});

import axiosInstance from "@/lib/axios";
import Loader from "../ui/Loader";

import { useContext } from "react";
import { UserContext } from "@/hooks/UserProvider";

export function LoginForm() {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    csrf();
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "nbss2929@gmail.com",
      password: "nhbaral78",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(values) {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/login", values, {
        headers: {
          "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
        },
      });
      // console.log('Response', response);
      if (response) {
        const user = await axiosInstance.get("/user");
        if (user) {
          // console.log(user);
          Cookies.set("id", user.data.user.id);
          Cookies.set("status", user.data.user.status);
          Cookies.set("auth", true);
          setError("");
          setUser(user.data.user);
          router.push("/admin/dashboard");
        }
      }
    } catch (err) {
      setError(err.response.data.message);
      // console.log('Login Error', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <Image
        src="/logo-gharabadi.png"
        className="mx-auto pt-3"
        alt="logo"
        width={180}
        height={48}
      />
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...field}
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
                  <FormItem className="grid gap-2">
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input id="password" type="password" required {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormDescription className="text-red-700">
                {error}
              </FormDescription>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Loader message={"Please Wait..."} /> : "Login"}
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

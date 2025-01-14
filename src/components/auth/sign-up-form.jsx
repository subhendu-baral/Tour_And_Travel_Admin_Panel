"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z
  .object({
    firstname: z
      .string({
        invalid_type_error: "First Name must contain at least 2 character(s)",
      })
      .min(2, {
        message: "First Name must contain at least 2 character(s)",
      }),
    lastname: z.string().min(2, {
      message: "Last Name must contain at least 2 character(s)",
    }),
    email: z.string().email().min(4, {
      message: "Email Name must contain at least 4 character(s)",
    }),
    phone: z.coerce.number().nonnegative().min(10, {
      message: "Invalid Phone Number",
    }),
    password: z.string().min(8, {
      message: "Password Must be min 8 Characters Long",
    }).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), {
      message:
          'Password must be at least 8 characters and contain an uppercase letter, lowercase letter, and number'
  }),
    confirm: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
export function SignUpForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "Subhendu",
      lastname: "Baral",
      phone: '',
      email: "nbss2929@gmail.com",
      password: "12345678",
      confirm: "12345678",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Card className="mx-auto max-w-lg">
      <Image
        src="/logo-gharabadi.png"
        className="mx-auto pt-3"
        alt="logo"
        width={180}
        height={48}
      />
      <CardHeader>
        <CardTitle className="text-2xl">Signup</CardTitle>
        <CardDescription>
          Enter your details below to create to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="firstname">First Name</FormLabel>
                    <FormControl>
                      <Input
                        id="firstname"
                        type="firstname"
                        placeholder="First Name"
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
                name="lastname"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="lastname">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        id="lastname"
                        type="lastname"
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="phone">Phone</FormLabel>
                    <FormControl>
                      <Input
                        id="phone"
                        type="number"
                        placeholder="Phone Number"
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
                    </div>
                    <Input id="password" type="password" required {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex items-center">
                      <FormLabel htmlFor="confirm">Confirm Password</FormLabel>
                    </div>
                    <Input id="confirm" type="password" required {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Sign up
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

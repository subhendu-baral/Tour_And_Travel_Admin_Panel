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

const formSchema = z.object({
  email: z.string().email().min(5),
});

export function ForgotPasswordForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "nbss2929@gmail.com",
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Card className="mx-auto max-w-sm">
       <Image src="/logo-gharabadi.png" className="mx-auto pt-3" alt="logo" width={180} height={48} />
      <CardHeader>
        <CardTitle className="text-2xl">Recover your Account</CardTitle>
        <CardDescription>
          Enter your email below to recover your account
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
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Return back to{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

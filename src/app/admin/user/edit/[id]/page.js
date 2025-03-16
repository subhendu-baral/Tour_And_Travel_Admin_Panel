"use client";

import UserProfileEditSkeleton from "./loading";
import { useParams } from "next/navigation";

import { useTransition, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

import axiosInstance from "@/lib/axios";
import { abort } from "process";

export default function Page() {
  const { toast } = useToast();
  const params = useParams();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z
      .string()
      .max(15, {
        message: "Phone must be at most 15 characters.",
      })
      .regex(/^[0-9+-]+$/, {
        message: "Phone can only contain letters, numbers, +, and -.",
      }),
    roles: z.array(z.number()).refine((value) => value.length > 0, {
      message: "Please select at least one role.",
    }),
    status: z.enum(["active", "inactive"], {
      message: "Status must be either active or inactive.",
    }),
  });
  const [rolelist, setRolelist] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      roles: [],
      status: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(() => {
      axiosInstance
        .get("/get-user/" + params.id)
        .then((res) => {
          const data = res.data.user;
          setRolelist(res.data.roles);
          form.reset({
            name: data.name ?? '',
            email: data.email ?? '',
            phone: data.phone ?? '',
            roles: Array.isArray(data.roles)
              ? data.roles.map((role) => role.id)
              : [],
            status: data.status ?? '',
          });
        })
        .catch((error) => {
          abort;
          if (error.response && error.response.status === 404) {
            window.location.href = "/404";
          } else {
            console.error("Error fetching user data:", error);
          }
        })
        .finally(() => {});
    });
  }, [params.id]);

  async function onSubmit(values) {
    await axiosInstance
      .post("/update-user/" + params.id, values)
      .then((res) => {
        toast({
          title: "Success",
          description: res.data.message,
        });
      })
      .catch((errors) => {
        if (errors) {
          const err = errors.response.data.errors;
          const errfields = Object.keys(err)
          errfields.forEach((item)=>{
              form.setError(item, {
                type: "server",
                message:err[item]
              })
            })
            form.setFocus(errfields[0])
          
        }
        else{
          console.error("Error updating user data:", errors);
          toast({
            title: "Error",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
          });
        }
      });
  }

  const { errors, isSubmitting } = form.formState;

  return (
    <>
      {isPending ? (
        <UserProfileEditSkeleton />
      ) : (
        <div className="container mx-auto py-5">
          <Card className=" mx-auto">
            <CardHeader>
              <CardTitle>Edit User Profile</CardTitle>
              <CardDescription>
                Update user information and assign a role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
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
                          <Input placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="roles"
                    render={() => (
                      <FormItem>
                        <FormField
                          control={form.control}
                          name="roles"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Assign Roles</FormLabel>
                              <div className="space-y-4">
                                {rolelist.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`role-${item.id}`}
                                      checked={
                                        field.value?.includes(item.id) || false
                                      }
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item.id
                                              )
                                            );
                                      }}
                                    />
                                    <Label htmlFor={`role-${item.id}`}>
                                      {item.name}
                                    </Label>
                                  </div>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Select Status</SelectLabel>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">
                                  Inactive
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {errors &&
                    <FormDescription>
                    {errors.root?.serverError && (
                      <p className="text-red-500">Something Went Wronge. Please Try again.</p>
                    )}
                    </FormDescription>
                  }
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Updating..." : "Save Changes"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

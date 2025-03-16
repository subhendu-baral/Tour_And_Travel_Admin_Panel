"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useEffect, useState, use } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";

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
import axiosInstance from "@/lib/axios";

import { UserInfo } from "./page";
import { useToast } from "@/hooks/use-toast";

export default function AddUser() {
  const { toast } = useToast();
  const [rolelist, setRolelist] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (rolelist.length == 0) {
      axiosInstance.get("/roles").then((res) => {
        setRolelist(res.data.roles);
      });
    }
  }, [open]);

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z
      .string()
      .min(10, "Please Enter a valid Phone number")
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

  const {setUserChanged} = use(UserInfo);

  async function onSubmit(values) {
    await axiosInstance
      .post("/add-user", values)
      .then((res) => {
        if (res.data) {
          toast({
            title: "Success",
            description: res.data.message,
          });
          form.reset();
          setOpen(false);
          setUserChanged((prev) => !prev);
        }
      })
      .catch((errors) => {
        if (errors) {
          const err = errors.response.data.errors;
         if(err){
          const errfields = Object.keys(err);
          errfields.forEach((item) => {
            form.setError(item, {
              type: "server",
              message: err[item],
            });
          });
          form.setFocus(errfields[0]);
         }
        } else {
          // console.error("Error updating user data:", errors);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add User</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add User</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {errors && (
                <FormDescription>
                  {errors.root?.serverError && (
                    <p className="text-red-500">
                      Something Went Wronge. Please Try again.
                    </p>
                  )}
                </FormDescription>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Adding..." : "Save Changes"}
              </Button>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

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
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";

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

import { useToast } from "@/hooks/use-toast";

export default function AddPermission({ setPermissionChanged, open, setOpen, isEdit = {} }) {
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    description: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values) {
    console.log(values);
    try {
      const res = await axiosInstance.put(`/permissions/${isEdit.openEdit && isEdit.editData.id}`, values)
      if (res.data) {
        toast({
          title: "Success",
          description: res.data.message,
        });
        form.reset();
        setOpen(false);
        setRoleChanged((prev) => !prev);
      }
    } catch (errors) {
      console.log(errors);
      if (errors.response?.data?.errors) {
        const err = errors.response.data.errors;
        const errfields = Object.keys(err);
        errfields.forEach((item) => {
          form.setError(item, {
            type: "server",
            message: err[item],
          });
        });
        form.setFocus(errfields[0]);
      } else {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      // Any cleanup or final actions can be placed here
    }
  }

  const { errors, isSubmitting } = form.formState;

  useEffect(() => {
    if (isEdit.openEdit) {
      form.reset({
        name: isEdit.editData.name ?? "",
        description: isEdit.editData.description ?? "",
      });
    }
  }, [isEdit, form]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button>Add Permission</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Add Permission</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Permission Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Editor" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Description"
                        className="resize-none"
                        {...field}
                      />
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

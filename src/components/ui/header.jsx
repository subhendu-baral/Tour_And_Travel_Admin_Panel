"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import Link from "next/link";
import Image from "next/image";

import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "./sidebar";
import { DarkMode } from "../dark-mode";
import { use } from "react";
import { UserContext } from "@/hooks/UserProvider";

export default function Header() {
  const { user } = use(UserContext);

  return (
    <header className="fixed w-full top-0 z-30 flex items-center gap-4 border-b px-4 h-[55px] sm:h-[60px] sm:px-6  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-xl">
      <div className="relative flex items-center w-3/4">
        <Image
          className="dark:bg-white dark:p-[5px] dark:rounded-sm"
          src="/logo-gharabadi.png"
          width={170}
          height={60}
          alt="Logo"
        />
        <SidebarTrigger className="h-[60px] ms-5" />

        <div className="flex items-center mx-auto gap-3">
          <Input
            type="search"
            placeholder="Search..."
            className="w-full hidden lg:block rounded-lg bg-background pl-8 md:w-[200px] lg:w-[450px]"
          />
          <Search className="h-4 w-4 block md:hidden text-muted-foreground " />
        </div>
      </div>
      <div className="w-1/4 flex justify-end gap-3 items-center">
        <DarkMode />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex ">
              <Button variant="outline" size="icon" className="overflow-hidden">
                <div className="rounded-full ms-auto">
                  <Image
                    src="/placeholder-user.webp"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </div>
              </Button>
              <div className="ml-3 flex flex-col">
                <p>Hi,</p>
                <p>{user?.name || "Guest"}</p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <Logout /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

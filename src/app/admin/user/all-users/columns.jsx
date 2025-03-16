"use client";


import { Checkbox } from "@/components/ui/checkbox";

import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import { UserInfo } from "./page";


export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const [isMenuOpen, setIsMenuOpen] = useState(false);

      const id = parseFloat(row.original.id)

      const { setDeleteUserID, setIsDeleteOpen } = useContext(UserInfo);
      const deleteUser = (id) => {
        setDeleteUserID(id);
        setIsDeleteOpen(true);
      };

      return (
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href={`/admin/user/edit/${id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <div className='cursor-pointer' onClick={() => deleteUser(id)}>Delete</div>
        </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

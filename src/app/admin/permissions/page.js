"use client";

import { useEffect, useState, useTransition } from "react";
import axiosInstance from "@/lib/axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ManagePermissions() {
  const { toast } = useToast();

  const [permissions, setPermissions] = useState([]);

  const [permissionChanged, setpermissionChanged] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/permissions/")
      .then((res) => {
        if (res.data?.permissions) {
          setPermissions(res.data.permissions);
        } else {
          setPermissions([]); 
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to fetch permissions. Please try again.",
          variant: "destructive",
        });
      });
  }, [permissionChanged]);

  return (
    <div className="p-6 w-full">
      <Card>
        <CardContent className="p-4 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold mb-4">View Permissions</h2>
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Permission</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {}
              {permissions.map((permission, index) => (
                <TableRow key={permission.name}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import AddRole from "./addRole";
import axiosInstance from "@/lib/axios";
import { SkeletonTable } from "@/components/ui/skeleton-table";
import { ConfirmDelete } from "@/components/confirmDelete";

export default function ManageAvailableRoles() {
  const [roles, setRoles] = useState([]);

  const [selectedItem, setSelectedItem] = useState("");

  const [roleChanged, setRoleChanged] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEdit, setisEdit] = useState({
    openEdit: false,
    editData: {},
  });
  const [sheetopen, setsheetOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/roles/")
      .then((res) => {
        if (res.data?.roles) {
          setRoles(res.data.roles);
        } else {
          setUsers([]); // Fallback to empty array
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to fetch Roles. Please try again.",
          variant: "destructive",
        });
      });
  }, [roleChanged]);

  const handleDelete = () => {
    try {
      axiosInstance.delete(`/roles/${selectedItem}`).then(() => {
        setRoleChanged((prev) => !prev);
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete role. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSelectedItem("");
    }
  };

  const editPermissions = (id) => {
    axiosInstance
      .get(`/roles/${id}`)
      .then((res) => {
        if (res.data?.role) {
          setisEdit({ openEdit: true, editData: res.data.role });
        } else {
          setUsers([]); // Fallback to empty array
        }
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to fetch Roles. Please try again.",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="p-6 w-full">
      {isDeleteOpen && (
        <ConfirmDelete
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          handleDelete={handleDelete}
          message={
            "This action will permanently delete this role and remove its data from the servers."
          }
        />
      )}
      <Card>
        <CardContent className="p-4 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold mb-4">
              Manage Available Roles
            </h2>
            <AddRole
              isEdit={isEdit}
              open={sheetopen}
              setOpen={setsheetOpen}
              setRoleChanged={setRoleChanged}
            />
          </div>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!roles.length ? (
                <TableRow>
                  <TableCell colSpan="4" className="h-24 text-center">
                    <SkeletonTable />
                  </TableCell>
                </TableRow>
              ) : (
                roles.map((role, index) => (
                  <TableRow key={role.name}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>
                      {role.permissions.length > 0
                        ? role.permissions.map((item) => item.name).join(", ")
                        : "No Permissions"}
                    </TableCell>
                    <TableCell>{role.description}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => {
                              setisEdit(true);
                              setsheetOpen(true);
                              editPermissions(role.id);
                            }}
                            className="cursor-pointer"
                          >
                            Edit Permissions
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedItem(role.id);
                              setIsDeleteOpen(true);
                            }}
                            className="text-red-500 cursor-pointer"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

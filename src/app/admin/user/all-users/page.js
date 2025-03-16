"use client";
import axiosInstance from "@/lib/axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useTransition, useEffect, useState, createContext } from "react";
import { ConfirmDelete } from "./confirmDelete";
import { useToast } from "@/hooks/use-toast";

export const UserInfo = createContext();

export default function Page() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState([]); // Changed from {} to []
  const [userChanged, setUserChanged] = useState(false);
  const [deleteUserID, setDeleteUserID] = useState("");
  const [isDeleting, startDeleting] = useTransition();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDeleteUser = () => { // Fixed function name
    startDeleting(() => {
      axiosInstance
        .delete(`/delete-user/${deleteUserID}`)
        .then((res) => {
          if (res.data) {
            toast({
              title: "Success",
              description: res.data.message,
            });
          }
          setUserChanged((prev) => !prev);
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to Delete User. Please try again.",
            variant: "destructive",
          });
        });
    });
  };

  
  useEffect(() => {
    startTransition(() => {
      axiosInstance
        .get("/get-all-users")
        .then((res) => {
          if (res.data?.users) {
            const data = res.data.users.map((user) => ({
              id: user.id,
              name: user.name,
              email: user.email,
              role:
                user.roles.length > 0
                  ? user.roles
                      .map(
                        (role) =>
                          role.name.charAt(0).toUpperCase() + role.name.slice(1)
                      )
                      .join(", ")
                  : "No Role",
              status: user.status.charAt(0).toUpperCase() + user.status.slice(1),
            }));
            setUsers(data);
          } else {
            setUsers([]); // Fallback to empty array
          }
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to fetch users. Please try again.",
            variant: "destructive",
          });
        });
    });
  }, [userChanged]);

  return (
    <UserInfo.Provider
      value={{
        setUserChanged,
        setDeleteUserID,
        setIsDeleteOpen,
        handleDeleteUser,
        isDeleteOpen, // Fixed variable name
      }}
    >
      <DataTable columns={columns} data={users} />
      <ConfirmDelete />
    </UserInfo.Provider>
  );
}

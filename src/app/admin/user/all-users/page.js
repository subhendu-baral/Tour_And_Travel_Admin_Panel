"use client";
import axiosInstance from "@/lib/axios";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useTransition, useEffect, useState } from "react";


export default function page() {
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState({});

  useEffect(() => {
    startTransition(() => {
      axiosInstance.get("/get-all-users")
        .then((res) => {
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
        })
    });
  }, []);

  return (
    <>
      { <DataTable columns={columns} data={users} />}
    </>
  );
}

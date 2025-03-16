"use client";
import axiosInstance from "@/lib/axios";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserProvider({children}) {
  const [user, setUser] = useState('');

  useEffect(()=>{
    axiosInstance.get('/user').then((res)=>{
      setUser(res.data.user);
    })
  }, [])


  return (
    <UserContext value={{user, setUser}}>
      {children}
    </UserContext>
  )
}

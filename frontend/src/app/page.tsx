"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CounterComponent from "@/redux/counter/CounterComponent";
import Image from "next/image";

export default function Home() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const router = useRouter();

  useEffect(() => {
    router.push("/projects");
  }, [router]);

  return null;
   
}

"use client";
import CounterComponent from "@/redux/counter/CounterComponent";
import { RootState, AppDispatch } from "@/app/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoggedIn}hii
      <CounterComponent />
    </main>
  );
}

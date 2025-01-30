"use client"
import Header from "@/components/header";

export default function Sample() {
  return (
    <div className="flex flex-col flex-1 h-screen">
      <Header />
      <main className="flex flex-1 flex-col gap-6 overflow-auto bg-slate-100 p-4">
      </main>
    </div>
  );
}

import LocationChecker from "@/components/locationTracker";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/dashboard");
  return null;
}

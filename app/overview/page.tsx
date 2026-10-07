import { redirect } from "next/navigation";

// The overview now lives at the homepage. Keep old links working.
export default function OverviewRedirect(){
  redirect("/");
}

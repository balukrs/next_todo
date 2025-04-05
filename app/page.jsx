import Login from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default function Home() {
  const session = getServerSession(authOptions);

  if (session) redirect("/home");
  return (
    <main>
      <Login />
    </main>
  );
}

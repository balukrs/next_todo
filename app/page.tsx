import Login from "../components/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/home");
  return (
    <main>
      <Login />
    </main>
  );
}

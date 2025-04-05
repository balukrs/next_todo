import RegisterForm from "@/components/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

function Register() {
  const session = getServerSession(authOptions);

  if (session) redirect("/home");
  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default Register;

"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Notifications from "@/utils/Notification";
import { useRouter } from "next/navigation";

function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response.error) {
        Notifications("Invalid Credentials", "error");
        return;
      }

      router.replace("home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className=" bg-gray-900 p-4 border-t-4 border-t-blue-600 rounded-lg">
        <h1 className="mb-2">Login</h1>
        <form
          className="flex flex-col gap-2.5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            placeholder="Email"
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" },
            })}
          />
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            })}
          />
          <button
            className=" bg-blue-900 rounded py-2 mt-2 cursor-pointer font-bold"
            type="submit"
          >
            Submit
          </button>
          {(errors?.email?.message || errors?.password?.message) && (
            <span className=" text-red-400">
              {errors?.email?.message ||
                errors?.password?.message ||
                "Error Occured"}
            </span>
          )}

          <Link href="/register" className="text-sm text-right">
            Dont Have an Account ? <span>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

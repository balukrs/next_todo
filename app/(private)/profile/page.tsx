"use client";

import { useSession } from "next-auth/react";

function Profile() {
  const { data: session } = useSession();

  return (
    <div className="min-h-[400] rounded-md inset-shadow-sm inset-shadow-gray-900 bg-blue-950 px-6 py-6">
      <h1 className="font-bold text-xl mb-2">Profile</h1>
      <div className="flex flex-col mb-6">
        <span>Name : {session?.user?.name}</span>
        <span>Email : {session?.user?.email}</span>
      </div>
      <form className=" flex flex-col gap-3 ">
        <span className="font-bold">Change Password</span>
        <input placeholder="Old Password" type="password" />
        <input placeholder="New Password" type="password" />
        <button className=" bg-blue-900 rounded py-2 mt-2 cursor-pointer font-bold w-[100px]">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Profile;

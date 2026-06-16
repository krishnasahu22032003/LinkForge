"use client";

import { useState } from "react";
import DashboardHeader from "@/components/ui/DashboardHeader";
import UpdateProfileModal from "@/components/ui/UpdateProfileModal";

export default function DashboardPage() {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const user = {
    username: "John Doe",
    email: "john@example.com",
    avatar: null,
  };

  async function handleSignOut() {
    console.log("sign out");
  }

  async function handleUpdateProfile(data: {
    username: string;
    previousPassword: string;
    password: string;
    confirmPassword: string;
  }) {
    console.log(data);
  }

  return (
    <>
      <DashboardHeader
        user={user}
        onUpdateProfile={() => setProfileModalOpen(true)}
        onSignOut={handleSignOut}
      />

      <UpdateProfileModal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        onSubmit={handleUpdateProfile}
      />

      <main className="pt-28">
        Dashboard Content
      </main>
    </>
  );
}
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { ProfileHeader } from "@/frontend/components/profile/ProfileHeader";
import { ProfileContent } from "@/frontend/components/profile/ProfileContent";

function ProfileInner() {
  const params = useParams();
  const userId = params?.id as string;
  const [profileUser, setProfileUser] = useState<any>(null);

  useEffect(() => {
    if (!userId) return;
    fetch(`/api/profile/${userId}`)
      .then((r) => r.json())
      .then((d) => d.success && setProfileUser(d.data.user));
  }, [userId]);

  return (
    <>
      <ProfileHeader profileUser={profileUser} />
      <ProfileContent userId={userId} />
    </>
  );
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />
      <Suspense fallback={<div className="p-8 text-center font-mono">Loading profile...</div>}>
        <ProfileInner />
      </Suspense>
      <Footer />
    </div>
  );
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/frontend/components/layout/Navbar";
import { Footer } from "@/frontend/components/layout/Footer";
import { ProfileHeader } from "@/frontend/components/profile/ProfileHeader";
import { ProfileContent } from "@/frontend/components/profile/ProfileContent";

function ProfileInner({ userId }: { userId?: string }) {
  const params = useParams();
  const activeId = userId || (params?.id as string);
  const [profileUser, setProfileUser] = useState<any>(null);

  useEffect(() => {
    if (!activeId) return;
    fetch(`/api/profile/${activeId}`)
      .then((r) => r.json())
      .then((d) => d.success && setProfileUser(d.data.user));
  }, [activeId]);

  return (
    <>
      <ProfileHeader profileUser={profileUser} />
      <ProfileContent userId={activeId} />
    </>
  );
}

export function ProfileClient({ userId }: { userId?: string }) {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col font-sans">
      <Navbar onOpenNewSnippet={() => {}} onOpenQuickNotes={() => {}} />
      <Suspense fallback={<div className="p-8 text-center font-mono">Loading profile...</div>}>
        <ProfileInner userId={userId} />
      </Suspense>
      <Footer />
    </div>
  );
}

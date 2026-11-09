import { ProfileClient } from "./ProfileClient";

export function generateStaticParams() {
  return [{ id: "me" }];
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProfileClient userId={id} />;
}

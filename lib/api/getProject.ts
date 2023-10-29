import { DOMAIN } from "../constants";
import { redirect } from "next/navigation";

export async function getProject({
  username,
  slug,
}: {
  username: string;
  slug: string;
}) {
  const res = await fetch(`${DOMAIN}/api/${username}/${slug}`);

  if (!res.ok) redirect("/404");

  return await res.json();
}

import { DOMAIN } from "../constants";

export async function getProjects() {
  const res = await fetch(`${DOMAIN}/api/projects`);

  return await res.json();
}

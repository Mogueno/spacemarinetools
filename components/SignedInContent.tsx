import { useCurrentUser } from "@/app/hooks/useCurrentUser";
import { LfgList } from "./LfgList";

export function SignedInContent() {
  const currentUser = useCurrentUser();

  if (currentUser.isLoading) {
    return <p>Loading...</p>;
  }

  return <LfgList />;
}

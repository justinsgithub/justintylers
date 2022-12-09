import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUser = () => {
  const session = useSession();
  const [user, setUser] = useState<any>(false)

  if (session?.data?.user) {
    return session.data.user
  }

  useEffect(() => {
    session?.data ? setUser(session?.data?.user) : setUser(false)
  }, [session])

  return user
}

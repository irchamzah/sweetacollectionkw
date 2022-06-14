import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
const admin = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      router.push("/admin/dashboard");
    } else {
      router.push("/auth/login");
    }
  }, []);
  return <p>Please Wait...</p>;
};

export default admin;

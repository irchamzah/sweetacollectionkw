import React, { useEffect } from "react";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import { useSession, signIn, signOut } from "next-auth/react";
import Router, { useRouter } from "next/router";

export default function Auth({ children }) {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      Router.push("/admin/dashboard");
    }
  });

  if (!session) {
    return (
      <>
        {/* <Navbar transparent /> */}
        <main>
          <section className="relative w-full h-full py-40 min-h-screen">
            <div
              className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
              style={{
                backgroundImage: "url('/img/register_bg_2.png')",
              }}
            ></div>
            {children}
            {/* <FooterSmall absolute /> */}
          </section>
        </main>
      </>
    );
  }
  return "";
}

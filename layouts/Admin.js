import React, { useEffect } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import { useSession, signIn, signOut } from "next-auth/react";
import Router, { useRouter } from "next/router";

export default function Admin({ children }) {
  const { data: session } = useSession();
  useEffect(() => {
    if (!session) {
      Router.push("/auth/login");
    }
  });

  if (session) {
    return (
      <>
        <Sidebar />
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {/* Header */}
          {/* <HeaderStats /> */}
          {children}

          <div className="px-4 md:px-10 mx-auto w-full h-full">
            {/* <FooterAdmin /> */}
          </div>
        </div>
      </>
    );
  }
  return "";
}

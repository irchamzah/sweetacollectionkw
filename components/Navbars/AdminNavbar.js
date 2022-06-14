import React from "react";
import { useEffect, useState } from "react";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
export default function Navbar() {
  const [name, setName] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      setName(session.user.first_name + " " + session.user.last_name);
    }
  }, []);
  return (
    <>
      {/* Navbar */}
      <nav className="absolute hidden top-0 left-0 w-full z-10 bg-blueGray-800 md:flex-row md:flex-nowrap md:justify-start md:flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {router.pathname.split("/")[
              router.pathname.split("/").length - 1
            ][0] == "["
              ? router.pathname.split("/")[
                  router.pathname.split("/").length - 2
                ]
              : router.pathname.split("/")[
                  router.pathname.split("/").length - 1
                ]}
          </a>
          {/* Form */}
          {/* <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
            </div>
          </form> */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <div>
              Logged in as <span className="text-white"> {" " + name}</span>
            </div>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}

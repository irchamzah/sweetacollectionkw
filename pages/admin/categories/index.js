// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Admin from "layouts/Admin";
import Link from "next/link";
import { useRouter } from "next/router";
import CardCategories from "components/Cards/CardCategories";
import Pagination from "components/Pagination/Pagination";
const products = () => {
  let view;
  view = (
    <>
      <div className="relative bg-transparent pt-20 mx-5">
        <div className="mt-10 h-screen">
          <div className="w-full mb-12 px-4">
            <CardCategories />
          </div>
          {/* <Pagination /> */}
        </div>
      </div>
    </>
  );

  return view;
};

products.layout = Admin;

export default products;

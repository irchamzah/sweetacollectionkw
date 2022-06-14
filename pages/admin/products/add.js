// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Admin from "layouts/Admin";
import CardProduct from "components/Cards/CardProduct";
import Link from "next/link";
import { useRouter } from "next/router";

const products = ({ data }) => {
  let view;
  let router = new useRouter();
  try {
    if (data) {
      view = (
        <>
          <div className="relative bg-transparent pt-20 mx-5">
            <div className="mt-10 h-screen">
              <div className="w-full">
                <div className="flex flex-nowrap justify-between items-end">
                  <Link href={"/admin/products/"}>
                    <a className="underline">Kembali</a>
                  </Link>
                  {/* <div className="flex flex-row-reverse">
                    <button
                      className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button"
                    >
                      <div className="flex flex-nowrap justify-between">
                        <Link href={"/admin/products/add"}>
                          <div className="mx-auto my-auto">
                            <i className="fa-solid fa-circle-plus"></i>
                            <span> Buat</span>
                          </div>
                        </Link>
                      </div>
                    </button>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-wrap justify-start mt-5 bg-white p-8">
                <div className="border-1 w-full mx-auto ">
                  <div className="grid grid-cols-2 gap-0 border-1">
                    <div className="">
                      <div className="grid grid-cols-1 gap-4 w-full">
                        <div className="grid grid-cols-1 gap-2 ">
                          <span>Nama Produk:</span>
                          <input className="border-b-2 border-indigo-100 transition focus:delay-150 focus:border-b-3 focus:border-indigo-500 outline-none p-2 w-full"></input>
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          <span>Kategori:</span>
                          <input className="outline-none border-l-3 p-2 rounded-md"></input>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <span>Deskripsi:</span>
                          <input className="outline-none border-l-3 p-2 rounded-md"></input>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <span>Warna:</span>
                          <input className="outline-none border-l-3 p-2 rounded-md"></input>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <span>Ukuran:</span>
                          <input className="outline-none border-l-3 p-2 rounded-md"></input>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <span>Total Stok:</span>
                          <input className="outline-none border-l-3 p-2 rounded-md"></input>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          <span>Harga:</span>
                          <input className="outline-none border-l-3 p-2 rounded-md"></input>
                        </div>
                      </div>
                    </div>
                    {/* <div className="w-[50%]">b</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      view = <>Please Wait</>;
    }
  } catch (err) {
    view = <>Gagal memuat data</>;
  }
  // useEffect(() => {
  //   try {
  //     if (loading) {
  //       view = <>Please Wait</>;
  //     } else {
  //       view = (
  //         <>
  //           <div className="relative bg-transparent pt-20">
  //             <div className="px-6 mt-10 h-screen">
  //               <div className="flex">{data}</div>
  //             </div>
  //           </div>
  //         </>
  //       );
  //     }
  //   } catch (err) {
  //     view = <>ERROR {err}</>;
  //   } finally {
  //     loading = false;
  //   }
  // });

  return view;
};

const getStaticProps = async () => {
  let data;
  await axios.get("/api/admin/product/getAllProducts", {}).then((res) => {
    data = res.data.data;
  });
  return {
    props: {
      data: data,
    },
  };
};

products.layout = Admin;

export { getStaticProps };
export default products;

import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CardKatalog from "components/Cards/CardKatalog";
// components

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      await axios.get("/api/admin/product/getAllProducts", {}).then((res) => {
        setData(res.data.data);
      });
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };

  const sendEditModalData = (data) => {
    setEditModalData(data);
    setParentEditModal(true);
  };

  const sendDeleteModalData = (data) => {
    setDeleteModalData(data);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://news.unair.ac.id/wp-content/uploads/2020/05/Ilustrasi-oleh-pesona-travel.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">Katalog</h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    Persewaan Baju Tari
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"></div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"></div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <section className="product spad">
                <div className="container">
                  <div className="row flex justify-between mb-24">
                    <div className="col-lg-4 col-md-4">
                      <div className="section-title">
                        <h4>List Baju Tari</h4>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                      {/* <ul className="filter__controls flex gap-8">
                        <li className="active" data-filter="*">
                          All
                        </li>
                        <li data-filter=".women">Women’s</li>
                        <li data-filter=".men">Men’s</li>
                        <li data-filter=".kid">Kid’s</li>
                        <li data-filter=".accessories">Accessories</li>
                        <li data-filter=".cosmetic">Cosmetics</li>
                      </ul> */}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-start mt-5">
                    {data.length > 0 ? (
                      data.map((val) => (
                        <div className="mx-2" key={val.id}>
                          <CardKatalog
                            data={val}
                            sendEditModalData={sendEditModalData}
                            sendDeleteModalData={sendDeleteModalData}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="mt-4 w-full text-center justify-center items-center">
                        Data tidak ditemukan
                      </div>
                    )}
                  </div>

                  <div className="row property__gallery grid grid-cols-7 gap-10">
                    <div className="col-lg-3 col-md-4 col-sm-6 mix women"></div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-blueGray-800">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-800 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold text-white">
                  Terima Kasih Sudah Menjadi Pelanggan Setia Kami
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                  Kami Senantiasa Menunggu Kehadiran Anda Kembali
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-blueGray-400">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import IndexNavbar from "../../components/Navbars/IndexNavbar";
import React, { useState } from "react";

const Product3 = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <>
      <IndexNavbar fixed />
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 md:mt-10 xl:mt-10 mt-10">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img
            className="w-full"
            alt="foto tampak depan"
            src="img/3.jpg"
          />
        </div>
        <div className="md:hidden">
          <img
            className="w-full"
            alt="img of a girl posing"
            src="https://i.ibb.co/QMdWfzX/component-image-one.png"
          />
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <p className="text-sm leading-none text-gray-600">Detail Produk</p>
            <h1
              className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
            >
              (Nama Baju atau pakaian yang dipilih)
            </h1>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Kategori</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600">Baju Bali</p>
            </div>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Warna</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600">Merah</p>
            </div>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Ukuran</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 mr-3">XL</p>
            </div>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">
              Stok yang tersedia
            </p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 mr-3">100</p>
            </div>
          </div>

          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Harga Sewa</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 mr-3">
                Rp.100.000
              </p>
            </div>
          </div>
          <button
            className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						items-center
						justify-center
						leading-none
						text-white
						bg-[#25D366]
						w-full
						py-4
						hover:bg-[#128C7E]
					"
          >
            <i className="fa-brands fa-whatsapp mr-1 fa-lg"></i>
            Hubungi Penyewa
          </button>
          <div>
            <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7">
              DESKRIPSI PRODUK It is a long established fact that a reader will
              be distracted by thereadable content of a page when looking at its
              layout. The point of usingLorem Ipsum is that it has a
              more-or-less normal distribution of letters.
            </p>
            <p className="text-base leading-4 mt-7 text-gray-600">
              Product Code: 8BN321AF2IF0NYA
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Length: 13.2 inches
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Height: 10 inches
            </p>
            <p className="text-base leading-4 mt-4 text-gray-600">
              Depth: 5.1 inches
            </p>
            <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">
              Composition: 100% calf leather, inside: 100% lamb leather
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product3;

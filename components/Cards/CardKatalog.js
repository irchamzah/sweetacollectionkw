import React from "react";
import Link from "next/link";
const CardProduct = ({ data, sendEditModalData, sendDeleteModalData }) => {
  return (
    <>
      {/* <div className="h-24 w-24 mx-auto my-auto bg-white"></div> */}
      <div className=" lg:max-w-sm"> <Link href="/detail">
      <img className="w-full" src={"/img/products/" + data.image}
              alt={data.product_name} /></Link>
              
      <p className="mt-4 text-sm text-gray-700"><Link href="/detail">
            <a
              href="#pablo"
              className="md:block text-left md:pb-0 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-0 px-0"
            >
              {data.product_name}

            </a>
          </Link></p>
      <p className="mt-0 pb-12 text-lg font-medium text-green-500">{data.price}</p>
    </div>
    </>
  );
};

export default CardProduct;

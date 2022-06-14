import React from "react";
import Link from "next/link";
const CardProduct = ({ data, sendEditModalData, sendDeleteModalData }) => {
  return (
    <>
      {/* <div className="h-24 w-24 mx-auto my-auto bg-white"></div> */}
      <div className="max-w-sm sm:max-w-md lg:max-w-sm h-fit max-h-fit shadow-md bg-white rounded-lg overflow-hidden mb-5">
        <div className="grid grid-cols-3 xs:grid-cols-1 gap-0">
          <div className="">
            <img
              className="w-full h-full object-cover md:h-full"
              src={"/img/products/" + data.image}
              alt={data.product_name}
            ></img>
          </div>
          <div className="p-8 h-full overflow-hidden col-span-2">
            <div className="flex flex-col h-full">
              <div className="basis-1/2">
                <button
                  className="mt-1 text-lg leading-tight font-medium text-black hover:underline"
                  onClick={() => sendEditModalData(data)}
                >
                  {data.product_name}
                </button>
                <p className="mt-2 w-full h-full text-slate-500 truncate">
                  {data.description}
                </p>
              </div>
              <div className="relative basis-1/2">
                <div className="absolute bottom-0 right-0">
                  <button
                    className="text-red-500 active:text-red-600  outline-none focus:outline-none ease-linear transition-all duration-150"
                    onClick={() => {
                      sendDeleteModalData(data);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;

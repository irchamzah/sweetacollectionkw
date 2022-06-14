import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
const ModalCreateRentalDetail = ({
  data,
  setParentCreateRentalDetail,
  sendDataToParent,
}) => {
  const [dataProducts, setDataProducts] = useState([]);
  const [productsId, setProductsId] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const getDataProducts = async () => {
    await axios
      .get("http://localhost:3000/api/admin/rentals/getDataProducts", {})
      .then((res) => {
        setDataProducts(res.data.dataProducts);
        // console.log(res.data.dataProducts);
      });
  };
  useEffect(() => {
    getDataProducts();
  }, []);

  const createData = async () => {
    setSubmitLoading(true);
    // console.log(typeof data.id);
    // console.log(typeof productsId);
    // console.log(typeof amount);
    // console.log(typeof note);

    // console.log(dataProducts);

    await axios
      .post("/api/admin/rentals/createRentalDetail", {
        id_rental: data.id,
        id_products: productsId,
        amount: amount,
        note: note,
      })
      .then((res) => {
        // console.log(res.data);

        if (res.status == 200) {
          setParentCreateRentalDetail(false, true, {
            type: "success",
            msg_capitalize: "Berhasil!",
            msg: "Data berhasil ditambahkan.",
          });
        } else {
          setParentCreateRentalDetail(false, true, {
            type: "error",
            msg_capitalize: "Gagal!",
            msg: "Data gagal ditambahkan.",
          });
        }
        setSubmitLoading(false);
      });
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-5xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Buat Baru</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setParentCreateRentalDetail(false);
                }}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            <div className="relative p-6 flex-auto">
              <div className="grid grid-cols-1 my-1">
                <div className="grid grid-cols-1 mb-3">
                  <span>Produk yang dipilih</span>
                  <select
                    onChange={(e) => {
                      setProductsId(e.target.value);
                    }}
                    defaultValue={productsId}
                    className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                  >
                    <option value={""}>-- Pilih Salah Satu --</option>
                    {dataProducts.map((val) => (
                      <option key={val.id} value={val.id}>
                        {val.product_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 mb-3">
                  <span>Amount</span>
                  <input
                    type={"number"}
                    className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                    defaultValue=""
                  ></input>
                </div>
                <div className="grid grid-cols-1 mb-3">
                  <span>Catatan (opsional)</span>
                  <textarea
                    className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                    rows="10"
                    defaultValue={""}
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-blueGray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => {
                  setParentCreateRentalDetail(false, false, {});
                }}
              >
                Close
              </button>
              <button
                className="text-white bg-blueGray-500 active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                disabled={
                  amount.trim().length < 1 ||
                  note.trim().length < 1 ||
                  submitLoading
                }
                onClick={() => {
                  createData();
                }}
              >
                {submitLoading ? "Tunggu Sebentar" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalCreateRentalDetail;

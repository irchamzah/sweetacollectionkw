import React, { useState } from "react";
import axios from "axios";
const ModalCreateCategory = ({ setParentCreateModal, sendDataToParent }) => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const createData = async () => {
    setSubmitLoading(true);
    await axios
      .post("http://localhost:3000/api/admin/product/createCategory", {
        category_name: categoryName,
        description: description,
      })
      .then((res) => {
        if (res.status == 200) {
          setParentCreateModal(false, true, {
            type: "success",
            msg_capitalize: "Berhasil!",
            msg: "Data berhasil ditambahkan.",
          });
        } else {
          setParentCreateModal(false, true, {
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
        <div className="relative w-full my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Buat Baru</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setParentCreateModal(false);
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
                  <span>Nama Kategori</span>
                  <input
                    className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                    onChange={(e) => {
                      setCategoryName(e.target.value);
                      console.log(e.target.value);
                    }}
                    defaultValue=""
                  ></input>
                </div>
                <div className="grid grid-cols-1 mb-3">
                  <span>Deskripsi</span>
                  <textarea
                    className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                    rows="10"
                    defaultValue={""}
                    onChange={(e) => {
                      setDescription(e.target.value);
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
                  setParentCreateModal(false, false, {});
                }}
              >
                Close
              </button>
              <button
                className="text-white bg-blueGray-500 active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                disabled={
                  categoryName.trim().length < 1 ||
                  description.trim().length < 1 ||
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

export default ModalCreateCategory;

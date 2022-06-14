import axios from "axios";
import React, { useState } from "react";

const ModalDeleteProduct = ({
  setParentDeleteModal,
  sendDataToParent,
  data,
}) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteProduct = async () => {
    setDeleteLoading(true);
    try {
      await axios
        .post("http://localhost:3000/api/admin/product/deleteProduct", {
          id: data.id,
        })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.msg == "success") {
              setParentDeleteModal(false);
              sendDataToParent(true, {
                type: "success",
                msg_capitalize: "Berhasil",
                msg: "Data berhasil dihapus.",
              });
            } else {
              setParentDeleteModal(false);
              sendDataToParent(true, {
                type: "error",
                msg_capitalize: "Gagal",
                msg: "Data gagal dihapus.",
              });
            }
          } else {
            setParentDeleteModal(false);
            sendDataToParent(true, {
              type: "error",
              msg_capitalize: "Gagal",
              msg: "Data gagal dihapus.",
            });
          }
        });
    } catch (err) {
      console.log(err);
      sendDataToParent(true, {
        type: "error",
        msg_capitalize: "Gagal",
        msg: "Data gagal dihapus.",
      });
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                Anda yakin ingin menghapus{" "}
                <span className="font-bold">{data.product_name}</span>?
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-blueGray-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                disabled={deleteLoading}
                onClick={() => setParentDeleteModal(false)}
              >
                Batal
              </button>
              <button
                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                disabled={deleteLoading}
                onClick={() => {
                  deleteProduct();
                }}
              >
                {deleteLoading ? "Tunggu Sebentar" : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};
export default ModalDeleteProduct;

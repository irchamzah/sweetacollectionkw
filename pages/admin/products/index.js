import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Admin from "layouts/Admin";
import CardProduct from "components/Cards/CardProduct";
import ModalCreateProduct from "components/Modals/ModalCreateProduct";
import ModalEditProduct from "components/Modals/ModalEditProduct";
import Pagination from "components/Pagination/Pagination";
import Alert from "components/Alerts/Alert";
import ModalDeleteProduct from "components/Modals/ModalDeleteProduct";
const products = () => {
  const [data, setData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [deleteModalData, setDeleteModalData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsgCapitalize, setAlertMsgCapitalize] = useState("Berhasil");
  const [alertMsg, setAlertMsg] = useState("Data berhasil diupdate");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      await axios.get("/api/admin/product/getAllProducts", {}).then((res) => {
        setData(res.data.data);
        console.log(res.data.data);
      });
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };
  const setParentCreateModal = (state) => {
    setShowCreateModal(state);
  };
  const setParentEditModal = (state) => {
    setShowEditModal(state);
  };
  const setParentDeleteModal = (state) => {
    setShowDeleteModal(state);
  };
  const sendDataToParent = (state, data) => {
    setAlertType(data.type);
    setAlertMsgCapitalize(data.msg_capitalize);
    setAlertMsg(data.msg);
    setShowAlert(state);
    getData();
  };
  const setParentShowAlert = (state) => {
    setShowAlert(state);
  };
  const sendEditModalData = (data) => {
    setEditModalData(data);
    setParentEditModal(true);
  };
  const sendDeleteModalData = (data) => {
    setDeleteModalData(data);
    setShowDeleteModal(true);
  };
  let view;
  try {
    if (data) {
      view = (
        <>
          <div className="relative bg-transparent pt-20 mx-5">
            <div className="mt-10 h-screen">
              <div className="w-full">
                {showAlert && (
                  <Alert
                    type={alertType}
                    msg_capitalize={alertMsgCapitalize}
                    msg={alertMsg}
                    setParentShowAlert={setParentShowAlert}
                  />
                )}
                <div className="flex flex-row-reverse">
                  <button
                    className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowCreateModal(true);
                    }}
                  >
                    <div className="flex flex-nowrap justify-between">
                      <div className="mx-auto my-auto">
                        <i className="fa-solid fa-circle-plus"></i>
                        <span> Buat</span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-start mt-5">
                {data.length > 0 ? (
                  data.map((val) => (
                    <div className="mx-2" key={val.id}>
                      <CardProduct
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
              {/* <Pagination /> */}
            </div>
          </div>
          {showCreateModal ? (
            <ModalCreateProduct
              setParentCreateModal={setParentCreateModal}
              sendDataToParent={sendDataToParent}
            />
          ) : null}
          {showEditModal ? (
            <ModalEditProduct
              sendDataToParent={sendDataToParent}
              setParentEditModal={setParentEditModal}
              data={editModalData}
            />
          ) : null}
          {showDeleteModal && (
            <ModalDeleteProduct
              sendDataToParent={sendDataToParent}
              setParentDeleteModal={setParentDeleteModal}
              data={deleteModalData}
            />
          )}
        </>
      );
    } else {
      view = <>Please Wait</>;
    }
  } catch (err) {
    view = <>Gagal memuat data</>;
  }

  return view;
};

products.layout = Admin;

export default products;

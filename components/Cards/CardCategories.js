import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import ModalEditCategory from "components/Modals/ModalEditCategory";
import ModalDeleteCategory from "components/Modals//ModalDeleteCategory";
import ModalCreateCategory from "components/Modals/ModalCreateCategory";
import Alert from "components/Alerts/Alert";
export default function CardCategories({ color }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "success",
    msg_capitalize: "test",
    msg: "test",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [activeData, setActiveData] = useState([]);
  const [allData, setAllData] = useState([]);
  const setParentShowAlert = (state) => {
    setShowAlert(state);
  };
  const setParentEditModal = (state, status, alert) => {
    setShowEditModal(state);
    if (status) {
      refreshData();
      setAlert(alert);
      setShowAlert(true);
    }
  };
  const setParentCreateModal = (state, status, alert) => {
    setShowCreateModal(state);
    if (status) {
      refreshData();
      setAlert(alert);
      setShowAlert(true);
    }
  };
  const setParentDeleteModal = (state, status, alert) => {
    setShowDeleteModal(state);
    if (status) {
      refreshData();
      setAlert(alert);
      setShowAlert(alert);
    }
  };

  const refreshData = async () => {
    await axios
      .get("http://localhost:3000/api/admin/product/getAllCategories", {})
      .then((res) => {
        setAllData(res.data.categories);
        console.log(res.data);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <>
      <div className="w-full flex flex-row-reverse mb-3">
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
      <div>
        {showAlert && (
          <Alert
            type={alert.type}
            msg_capitalize={alert.msg_capitalize}
            msg={alert.msg}
            setParentShowAlert={setParentShowAlert}
          />
        )}
      </div>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Kategori Produk
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Kategori
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Deskripsi
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Total Produk
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {allData.length > 0 ? (
                allData.map((val) => (
                  <tr key={val.id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                      <span
                        className={
                          "font-bold " +
                          +(color === "light"
                            ? "text-blueGray-600"
                            : "text-white")
                        }
                      >
                        {val.category_name}
                      </span>
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                      {val.description}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {val.count}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p- text-right">
                      <div className="flex flex-row flex-nowrap  gap-4">
                        <button
                          onClick={() => {
                            setActiveData(val);
                            setShowEditModal(true);
                          }}
                        >
                          <i className="fa-solid fa-pen-to-square text-blueGray-600"></i>
                        </button>
                        <button
                          onClick={() => {
                            setActiveData(val);
                            setParentDeleteModal(true);
                          }}
                        >
                          <i className="fa-solid fa-trash-can text-red-600"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={"404"}>
                  <td colSpan={4} className="w-full py-6 text-center">
                    Data tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showEditModal ? (
        <ModalEditCategory
          setParentEditModal={setParentEditModal}
          data={activeData}
        />
      ) : null}
      {showDeleteModal ? (
        <ModalDeleteCategory
          setParentDeleteModal={setParentDeleteModal}
          data={activeData}
        />
      ) : null}
      {showCreateModal ? (
        <ModalCreateCategory setParentCreateModal={setParentCreateModal} />
      ) : null}
    </>
  );
}

CardCategories.defaultProps = {
  color: "light",
};

CardCategories.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

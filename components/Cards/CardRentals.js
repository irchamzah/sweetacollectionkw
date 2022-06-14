import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";
import ModalDetailRentals from "components/Modals/ModalDetailRentals";
import ModalDeleteRentals from "components/Modals/ModalDeleteRentals";
import ModalCreateRentals from "components/Modals/ModalCreateRentalDetail";

import Alert from "components/Alerts/Alert";
// import Pagination from "components/Pagination/Pagination";

const CardRentals = ({ data, color }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    type: "success",
    msg_capitalize: "test",
    msg: "test",
  });
  const router = useRouter();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [allData, setAllData] = useState([]);
  const setParentShowAlert = (state) => {
    setShowAlert(state);
  };

  const setParentDeleteRentalsModal = (state, status, alert) => {
    setShowDeleteModal(state);
    if (status) {
      refreshData();
      setAlert(alert);
      setShowAlert(alert);
    }
  };
  const setParentCreateRentalsModal = (state, status, alert) => {
    setShowCreateModal(state);
    if (status) {
      refreshData();
      setAlert(alert);
      setShowAlert(true);
    }
  };

  const refreshData = async () => {
    await axios
      .get("http://localhost:3000/api/admin/rentals/getAllRentals", {})
      .then((res) => {
        setAllData(res.data.data);
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    refreshData();
  }, []);

  const [activeData, setActiveData] = useState([]);
  const [showDetailRentalsModal, setShowDetailRentalsModal] = useState(false);
  const setParentDetailRentalsModal = (state, status, alert) => {
    setShowDetailRentalsModal(state);
    if (status) {
      refreshData();
      setAlert(alert);
      setShowAlert(true);
    }
  };

  return (
    <>
      <button
        className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-6"
        type="button"
        onClick={() => {
          router.push("/admin/rentals/create");
        }}
      >
        <div className="flex flex-nowrap justify-between">
          <div className="mx-auto my-auto">
            <i className="fa-solid fa-circle-plus mr-1"></i>
            <span> Buat</span>
          </div>
        </div>
      </button>
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
                Penyewaan
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
                  No
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Nama Pemesan
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Nomor Telepon
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Alamat Pemesan
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Tanggal Pemesanan
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Tanggal Pengembalian
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Total Harga
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Status pesanan
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
              {allData.length > 0
                ? allData.map((val, index) => (
                    <tr key={val.id}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                        {++index}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {val.nama_pemesan}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {val.nomer_telepon}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {val.note}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {val.datetime}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {val.deadline}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        Rp.{val.total_price}
                      </td>

                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className={`fas fa-circle ${val.warna} mr-2`}></i>{" "}
                        {val.status}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p- text-right">
                        <div className="flex flex-row flex-nowrap  gap-4">
                          <button
                            onClick={() => {
                              setActiveData(val);
                              setShowDetailRentalsModal(val);
                            }}
                          >
                            <i className="fa-solid fa-pen-to-square fa-md"></i>
                          </button>
                          <button
                            onClick={() => {
                              setActiveData(val);
                              setParentDeleteRentalsModal(true);
                            }}
                          >
                            <i className="fa-solid fa-trash-can text-red-600"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
          {/* <Pagination /> */}
        </div>
      </div>
      {showDetailRentalsModal ? (
        <ModalDetailRentals
          setParentDetailRentalsModal={setParentDetailRentalsModal}
          data={activeData}
        />
      ) : null}
      {showDeleteModal ? (
        <ModalDeleteRentals
          setParentDeleteRentalsModal={setParentDeleteRentalsModal}
          data={activeData}
        />
      ) : null}
      {showCreateModal ? (
        <ModalCreateRentals
          setParentCreateModal={setParentCreateRentalsModal}
        />
      ) : null}
    </>
  );
};

CardRentals.defaultProps = {
  color: "light",
};

CardRentals.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};

export default CardRentals;

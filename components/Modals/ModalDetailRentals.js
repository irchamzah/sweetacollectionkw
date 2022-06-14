import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

//component
import ModalCreateRentalDetail from "components/Modals/ModalCreateRentalDetail";

const ModalDetailRentals = ({
  data,
  setParentDetailRentalsModal,
  sendDataToParent,
}) => {
  const router = useRouter();

  const [namaPemesan, setNamaPemesan] = useState(data.nama_pemesan);
  const [nomerTelepon, setNomerTelepon] = useState(data.nomer_telepon);
  const [note, setNote] = useState(data.note);
  const [dateTime, setDateTime] = useState(data.dateTime);
  const [deadline, setDeadline] = useState(data.deadline);
  const [totalPrice, setTotalPrice] = useState(data.total_price);
  const [rentalStatusid, setRentalStatusid] = useState(data.id_status);
  const [rentalStatus, setRentalStatus] = useState([]);

  const [saveLoading, setSaveLoading] = useState(false);

  const [dataRentalDetails, setData] = useState([]);

  const setParentCreateRentalDetail = (state, status, alert) => {
    setShowCreateRentalModal(state);
    if (status) {
      getDataRentalDetails();
      setParentDetailRentalsModal(alert);
      // setShowAlert(true);
    }
  };

  useEffect(() => {
    getDataRentalDetails();

    const getRentalStatus = async () => {
      await axios(
        "http://localhost:3000/api/admin/rentals/getAllRentalsStatus2",
        {}
      ).then((res) => {
        setRentalStatus(res.data.dataStatus);
        // console.log(res.data.dataStatus);
      });
    };
    getRentalStatus();
  }, []);

  const getDataRentalDetails = async () => {
    try {
      await axios
        .post("http://localhost:3000/api/admin/rentals/getRentalDetails", {
          id: data.id,
        })
        .then((res) => {
          setData(res.data.dataRentalDetails);
          // console.log(res.data.dataRentalDetails);
        });
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };

  const updateData = async () => {
    setSaveLoading(true);
    await axios
      .post("/api/admin/rentals/updateRentals", {
        rental: {
          id: data.id,
          nama_pemesan: namaPemesan,
          nomer_telepon: parseInt(nomerTelepon),
          note: note,
          datetime: dateTime,
          deadline: deadline,
          total_price: parseInt(totalPrice),
          id_status: parseInt(rentalStatusid),
        },
      })
      .then((res) => {
        if (res.status == 200) {
          setParentDetailRentalsModal(false, true, {
            type: "success",
            msg_capitalize: "Berhasil!",
            msg: "Data berhasil diubah.",
          });
        } else {
          setParentDetailRentalsModal(false, false, {
            type: "error",
            msg_capitalize: "Gagal!",
            msg: "Data gagal diubah.",
          });
        }
        // console.log(res.data);
        setSaveLoading(false);
      });
  };

  const [activeDataRental, setActiveDataRental] = useState([]);
  const [showCreateRentalModal, setShowCreateRentalModal] = useState(false);

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-5xl max-h-[42rem] overflow-y-scroll">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none ">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t ">
              <h3 className="text-3xl font-semibold">Detail Pesanan</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  setParentDetailRentalsModal(false);
                }}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div
              className={
                "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded overflow-y-auto"
              }
            >
              <div className="rounded-t mb-0 px-4 py-3 border-0  ">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <table className="items-center w-full bg-transparent border-separate">
                      <tr>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border">
                          Nama Pemesan
                        </td>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border font-semibold">
                          <input
                            className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                            defaultValue={data.nama_pemesan}
                            onChange={(e) => setNamaPemesan(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border">
                          Nomor Telepon
                        </td>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border font-semibold">
                          <input
                            className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                            defaultValue={data.nomer_telepon}
                            onChange={(e) => setNomerTelepon(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border">
                          Alamat Pemesan
                        </td>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border font-semibold">
                          <textarea
                            className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                            defaultValue={data.note}
                            onChange={(e) => setNote(e.target.value)}
                            rows="10"
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border">
                          Tanggal Pemesanan
                        </td>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border font-semibold">
                          <input
                            type="date"
                            onChange={(e) => {
                              setDateTime(e.target.value);
                            }}
                            defaultValue={data.datetime}
                            className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border">
                          Tanggal Pengembalian
                        </td>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border font-semibold">
                          <input
                            type="date"
                            onChange={(e) => {
                              setDeadline(e.target.value);
                            }}
                            defaultValue={data.deadline}
                            className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border">
                          Total Harga
                        </td>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border font-semibold">
                          Rp.
                          <input
                            className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                            defaultValue={data.total_price}
                            onChange={(e) => setTotalPrice(e.target.value)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border">
                          Status Pesanan
                        </td>
                        <td className="px-6 align-middle text-xs whitespace-nowrap p-4 border font-semibold">
                          <select
                            onChange={(e) => {
                              setRentalStatusid(e.target.value);
                            }}
                            defaultValue={""}
                            className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                          >
                            <option value={""}>-- Pilih Salah Satu --</option>
                            {rentalStatus.map((val) => (
                              <option key={val.id} value={val.id_status}>
                                {val.status}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    </table>
                    <hr className="mb-6 mt-12 border-t-4 " />
                    <h3 className={"font-semibold text-lg"}>Daftar Pesanan</h3>
                    <div className="text-right">
                      <button
                        className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-6 "
                        type="button"
                        onClick={() => {
                          setActiveDataRental(data);
                          setShowCreateRentalModal(data);
                        }}
                      >
                        <span> Tambah Pesanan</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block w-full">
                {/* Projects table */}
                <table className="items-center w-full bg-transparent border-collapse">
                  <thead>
                    <tr>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        No
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Nama Barang
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Warna
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Ukuran
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Jumlah
                      </th>

                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Sub-total harga
                      </th>
                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Catatan
                      </th>

                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      >
                        Foto Barang
                      </th>

                      <th
                        className={
                          "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left "
                        }
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataRentalDetails.length > 0
                      ? dataRentalDetails.map((val, index) => (
                          <tr>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                              {++index}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {val.product_name}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-wrap p-4">
                              {val.color}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {val.size}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {val.amount}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              Rp.{val.price}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {val.note}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              <img
                                src={"/img/products/" + val.image}
                                className="h-20 w-20 bg-white rounded-full border object-none object-scale-down"
                                alt={data.product_name}
                              ></img>{" "}
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-blueGray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                onClick={() => {
                  setParentDetailRentalsModal(false, false, {});
                }}
              >
                Close
              </button>
              <button
                className="text-white bg-blueGray-500 active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                disabled={saveLoading}
                onClick={() => {
                  updateData();
                }}
              >
                {saveLoading ? "Tunggu Sebentar" : "Simpan"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      {showCreateRentalModal ? (
        <ModalCreateRentalDetail
          setParentCreateRentalDetail={setParentCreateRentalDetail}
          data={activeDataRental}
        />
      ) : null}
    </>
  );
};

export default ModalDetailRentals;

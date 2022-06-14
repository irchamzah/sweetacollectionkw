import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
function CardCreateRentals(color) {
  const [rentalStatus, setRentalStatus] = useState([]);
  const [rentalStatusid, setRentalStatusid] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [note, setNote] = useState("");
  const [namaPemesan, setNamaPemesan] = useState("");
  const [nomerTelepon, setNomerTelepon] = useState("");
  const router = useRouter();

  useEffect(() => {
    const getRentalStatus = async () => {
      await axios(
        "http://localhost:3000/api/admin/rentals/getAllRentalsStatus",
        {}
      ).then((res) => {
        setRentalStatus(res.data.data);
      });
    };
    getRentalStatus();
  }, []);
  const submit = async () => {
    if (
      dateTime.trim() !== "" &&
      deadLine.trim() !== "" &&
      note.trim() !== "" &&
      namaPemesan.trim() !== "" &&
      totalPrice.length > 0 &&
      rentalStatusid.length > 0 &&
      nomerTelepon.length > 0
    ) {
      console.log("submitted");

      try {
        await axios
          .post("http://localhost:3000/api/admin/rentals/createRentals", {
            rental: {
              datetime: dateTime,
              deadline: deadLine,
              note: note,
              nama_pemesan: namaPemesan,
              total_price: parseInt(totalPrice),
              nomer_telepon: parseInt(nomerTelepon),
              id_status: parseInt(rentalStatusid),
            },
          })
          .then((res) => {
            // console.log(res.data);
            if (res.status === 200) {
              router.push("/admin/rentals/");
            } else {
              console.log(res.data);
            }
          });
      } catch (err) {
        console.log("Error");
      }
    } else {
      console.log("err");
    }
  };

  return (
    <>
      <div>
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="relative p-6 flex-auto max-h-[42rem] overflow-y-scroll">
            <button
              className="bg-blueGray-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mb-6"
              type="button"
              onClick={() => {
                router.push("/admin/rentals/");
              }}
            >
              <div className="flex flex-nowrap justify-between">
                <div className="mx-auto my-auto">
                  <i className="fa-solid fa-arrow-left mr-1"></i>
                  <span> kembali</span>
                </div>
              </div>
            </button>
            <div className="grid grid-cols-1 my-1">
              <div className="grid grid-cols-1 mb-3">
                <span>Nama Pemesan</span>
                <input
                  onChange={(e) => {
                    setNamaPemesan(e.target.value);
                  }}
                  defaultValue={""}
                  className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                ></input>
              </div>
              <div className="grid grid-cols-1 mb-3">
                <span>Nomor Telepon</span>
                <input
                  onChange={(e) => {
                    setNomerTelepon(e.target.value);
                  }}
                  defaultValue={""}
                  className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                ></input>
              </div>
              <div className="grid grid-cols-1 mb-3">
                <span>Alamat Pemesan</span>
                <textarea
                  className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                  rows="10"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  defaultValue={""}
                ></textarea>
              </div>
              <div className="grid grid-cols-1 mb-3">
                <span>Tanggal Pemesanan</span>
                <input
                  type="date"
                  onChange={(e) => {
                    setDateTime(e.target.value);
                  }}
                  defaultValue={""}
                  className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                ></input>
              </div>
              <div className="grid grid-cols-1 mb-3">
                <span>Tanggal Pengembalian</span>
                <input
                  type="date"
                  onChange={(e) => {
                    setDeadLine(e.target.value);
                  }}
                  defaultValue={""}
                  className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                ></input>
              </div>
              <div className="grid grid-cols-1 mb-3">
                <span>Total Harga</span>
                <input
                  onChange={(e) => {
                    setTotalPrice(e.target.value);
                  }}
                  defaultValue={""}
                  className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                ></input>
              </div>

              <div className="grid grid-cols-1 mb-3">
                <span>Status Pesanan</span>
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
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-white bg-blueGray-500 active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CardCreateRentals;

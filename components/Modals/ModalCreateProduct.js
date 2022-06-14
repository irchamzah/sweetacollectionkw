import React, { useState, useEffect } from "react";
import axios from "axios";
import Alert from "components/Alerts/Alert";
import FormData from "form-data";

const ModalCreateProduct = ({ setParentCreateModal, sendDataToParent }) => {
  const [categories, setCategories] = useState([]);

  const [productCategory, setProductCategory] = useState("");
  const [productCategoryId, setProductCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [totalStock, setTotalStock] = useState("");
  const [image, setImage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  // Alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMsgCapitalize, setAlertMsgCapitalize] = useState("Berhasil!");
  const [alertMsg, setAlertMsg] = useState("Data berhasil di update.");
  useEffect(() => {
    const getCategories = async () => {
      await axios("/api/admin/product/getAllCategories", {}).then((res) => {
        setCategories(res.data.categories);
      });
    };
    getCategories();
  }, []);
  const setParentShowAlert = (state) => {
    setShowAlert(state);
  };
  const submit = async () => {
    if (
      productName.trim() !== "" &&
      productCategoryId.trim() !== "" &&
      description.trim() !== "" &&
      color.trim() !== "" &&
      size.trim() !== "" &&
      price.length > 0 &&
      totalStock.length > 0 &&
      image
    ) {
      console.log("submitted");
      setDisableBtn(true);
      try {
        let formData = new FormData();
        formData.append("image", image);
        formData.append("product_name", productName);
        formData.append("product_category", productCategoryId);
        formData.append("description", description);
        formData.append("color", color);
        formData.append("size", size);
        formData.append("price", parseInt(price));
        formData.append("total_stock", parseInt(totalStock));
        await axios
          .post("/api/admin/product/createProduct", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setParentCreateModal(false);

              sendDataToParent(true, {
                type: "success",
                msg_capitalize: "Berhasil",
                msg: "Data berhasil ditambah.",
              });
            } else {
              setParentCreateModal(false);

              sendDataToParent(true, {
                type: "error",
                msg_capitalize: "Gagal",
                msg: "Data gagal ditambah.",
              });
            }
          });
      } catch (err) {
        setParentCreateModal(false);
        sendDataToParent(true, {
          type: "error",
          msg_capitalize: "Gagal",
          msg: "Data gagal ditambah.",
        });
      } finally {
        setDisableBtn(false);
      }
    } else {
      setAlertType("error");
      setAlertMsgCapitalize("Gagal");
      setAlertMsg("Pastikan semua data terisi.");
      setShowAlert(true);
      console.log("err");
    }
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
            <form
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
              encType="multipart/form-data"
            >
              <div className="relative p-6 flex-auto max-h-[42rem] overflow-y-scroll">
                {showAlert && (
                  <Alert
                    setParentShowAlert={setParentShowAlert}
                    type={alertType}
                    msg_capitalize={alertMsgCapitalize}
                    msg={alertMsg}
                  />
                )}
                <div className="grid grid-cols-1 my-1">
                  <div className="grid grid-cols-1 mb-3">
                    <span>Nama Produk</span>
                    <input
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                      defaultValue={productName}
                      className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                    ></input>
                  </div>
                  <div className="grid grid-cols-1 mb-3">
                    <span>Kategori Produk</span>
                    <select
                      onChange={(e) => {
                        setProductCategoryId(e.target.value);
                      }}
                      defaultValue={productCategoryId}
                      className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                    >
                      <option value={""}>-- Pilih Salah Satu --</option>
                      {categories.map((val) => (
                        <option key={val.id} value={val.id}>
                          {val.category_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 mb-3">
                    <span>Deskripsi</span>
                    <textarea
                      className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150 focus:ring-0 focus:border-x-transparent focus:border-t-transparent"
                      rows="10"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      defaultValue={description}
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 mb-3">
                    <span>Warna</span>
                    <input
                      onChange={(e) => {
                        setColor(e.target.value);
                      }}
                      defaultValue={color}
                      className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                    ></input>
                  </div>
                  <div className="grid grid-cols-1 mb-3">
                    <span>Ukuran</span>
                    <input
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                      defaultValue={size}
                      className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                    ></input>
                  </div>
                  <div className="grid grid-cols-1 mb-3">
                    <span>Harga</span>
                    <input
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      defaultValue={price}
                      type="number"
                      className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                    ></input>
                  </div>
                  <div className="grid grid-cols-1 mb-3">
                    <span>Total Stok</span>
                    <input
                      onChange={(e) => {
                        setTotalStock(e.target.value);
                      }}
                      defaultValue={totalStock}
                      type="number"
                      className="w-full mt-1 p-2 outline-none border-b-2 border-blueGray-100 transition focus:border-blueGray-500 focus:delay-150"
                    ></input>
                  </div>
                  <div className="grid grid-cols-1 mb-3 mt-3">
                    <span>Gambar Produk</span>
                    <input
                      type="file"
                      className="mt-2"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        console.log(Object.entries(e.target.files[0]).length);
                      }}
                    ></input>
                  </div>
                </div>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-blueGray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={() => {
                    setParentCreateModal(false);
                  }}
                  disabled={disableBtn}
                >
                  Close
                </button>
                <button
                  className="text-white bg-blueGray-500 active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="submit"
                  disabled={disableBtn}
                >
                  {disableBtn ? "Tunggu Sebentar" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalCreateProduct;

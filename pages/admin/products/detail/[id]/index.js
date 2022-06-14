import React from "react";
import { useRouter } from "next/router";
import Admin from "layouts/Admin";
import { useEffect, useState } from "react";
import axios from "axios";

const detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  let view;
  const getData = async () => {
    let a;
    await axios
      .get("/api/admin/product/getProductById", {
        id: id,
      })
      .then((res) => {
        a = res.data.data;
      });
    setData(a);
  };
  getData();
  console.log(data);
  // useEffect(() => {
  //   try {
  //     getData();

  //     // if (data) {
  //     //   if (data.length > 0) {
  //     //     view = <>{data.product_name}</>;
  //     //   } else {
  //     //     view = <>Data Not Found</>;
  //     //   }
  //     // } else {
  //     //   view = <>Please Wait</>;
  //     // }
  //   } catch (err) {
  //     view = <>Error : err</>;
  //   }
  // }, []);

  return (
    <>
      {/* <div className="relative bg-transparent pt-20 mx-5">{view}</div> */}
    </>
  );
};

detail.layout = Admin;

export default detail;

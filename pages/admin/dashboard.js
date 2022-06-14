import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

import CardStats from "components/Cards/CardStats.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [dataRentals, setDataRentals] = useState([]);
  const [dataRentals2, setDataRentals2] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      await axios
        .get("/api/admin/dashboard/getRentalsStatus", {})
        .then((res) => {
          setData(res.data);
          setDataRentals(res.data.dataRentals);
          setDataRentals2(res.data.dataRentals2);
          console.log(res.data);
        });
    } catch (err) {
      setData([]);
      console.log(err);
    }
  };

  return (
    <>
      <div className="relative md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="JUMLAH PESANAN DIPINJAM"
                  statTitle={data.dipinjam}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="fa-solid fa-truck-ramp-box"
                  statIconColor="bg-blue-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="JUMLAH PESANAN SELESAI"
                  statTitle={data.selesai}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-red-500"
                  statDescripiron=""
                  statIconName="fa-solid fa-check"
                  statIconColor="bg-green-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="JUMLAH PESANAN TELAT"
                  statTitle={data.telat}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-orange-500"
                  statDescripiron=""
                  statIconName="fa-solid fa-clock"
                  statIconColor="bg-gray-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="JUMLAH PESANAN HILANG"
                  statTitle={data.hilang}
                  statArrow=""
                  statPercent=""
                  statPercentColor="text-emerald-500"
                  statDescripiron=""
                  statIconName="fas fa-xmark"
                  statIconColor="bg-red-600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">{/* <CardBarChart /> */}</div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits dataRentals={dataRentals} />
        </div>
        <div className="w-full xl:w-6/12 px-4">
          <CardSocialTraffic dataRentals2={dataRentals2} />
        </div>
      </div>
    </>
  );
}

Dashboard.layout = Admin;

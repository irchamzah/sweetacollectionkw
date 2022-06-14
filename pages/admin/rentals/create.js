import React from "react";
import Admin from "layouts/Admin";
import CardCreateRentals from "components/Cards/CardCreateRentals"
const rentals = () => {
  return (
    <>
      <div className="relative bg-transparent pt-20 mx-5">
        <div className="mt-10 h-screen">
          <div className="w-full mb-12 px-4">
            <CardCreateRentals />
          </div>
        </div>
      </div>
    </>
  );
};

rentals.layout = Admin;
export default rentals;

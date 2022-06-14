import React from "react";

const Pagination = () => {
  return (
    <div className="py-2">
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap justify-center mt-4 mb-2 text-blueGray-600">
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              <i className="fas fa-chevron-left -ml-px"></i>
              <i className="fas fa-chevron-left -ml-px"></i>
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              <i className="fas fa-chevron-left -ml-px"></i>
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 text-white bg-blueGray-600"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              <i className="fas fa-chevron-right -mr-px"></i>
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-600 bg-white text-blueGray-600"
            >
              <i className="fas fa-chevron-right -mr-px"></i>
              <i className="fas fa-chevron-right -mr-px"></i>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

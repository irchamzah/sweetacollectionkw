import React, { useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { useRouter } from "next/router";
const test = (props) => {
  const [file, setFile] = useState("");
  let formData = new FormData();

  const submit = async () => {
    console.log(file ? "ok" : "ga");
    console.log(file);
    // formData.append("image", file);

    // await axios
    //   .post("/api/demo", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   });
  };
  return (
    <>
      <form
        action=""
        method="post"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        encType="multipart/form-data"
      >
        <input
          type={"file"}
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
          }}
        ></input>
        <button type="submit">submit</button>
      </form>
    </>
  );
};
export default test;

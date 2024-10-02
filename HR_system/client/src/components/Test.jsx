import React, { useEffect, useState } from "react";
import axios from "axios";

const Test = () => {
  const [counter, setCounter] = useState(0);
  const [dataAPI, setdataAPI] = useState(null);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("https://randomuser.me/api");
      console.log(response);
      setdataAPI(response.data); // Store the data part of the response
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <h1> TEST </h1>
      <p className="btn btn-primary"> {counter}</p> <br />
      <button onClick={() => setCounter(counter + 1)}>Count</button>
      <hr />

      {dataAPI ? (
        <div>
          <p>Data:</p>
          <p>Name: {dataAPI.results[0].name.first} {dataAPI.results[0].name.last}</p>
          <p>Email: {dataAPI.results[0].email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Test;

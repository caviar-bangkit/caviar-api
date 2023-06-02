import React, { useEffect, useState } from "react";
import axios from "axios";
export default function ListOfCrossing({ token }) {
  const [crossings, setCrossings] = useState([]);

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    const res = await axios.get("http://localhost:5000/api/crossings", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(res.data.data);
    setCrossings(res.data.data);
  };

  return (
    <div className="listOfCrossing">
      {Array.isArray(crossings) ? (
        crossings.map((crossing) => {
          return (
            <div key={crossing.id}>
              <h2>{crossing.name}</h2>
              <p>{crossing.latitude}</p>
              <p>{crossing.longitude}</p>
              <p>{crossing.header}</p>
            </div>
          );
        })
      ) : (
        <h2>There is no crossing</h2>
      )}
    </div>
  );
}

import axios from "axios";
import React, { useEffect, useState } from "react";
export default function ListOfCrossing() {
  const [crossings, setCrossings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // change with token later

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api") // change to real api url later
    setCrossings(res.data);
    console.log(res.data);
  };
  // add authorization header later

  return (
    <div className="listOfCrossing">
      {Array.isArray(crossings) ? (
        crossings.map((crossing) => {
          return (
            <div className="w-[700px] h-[200] px-6 py-4 flex shadow-xl rounded-xl justify-center items-center bg-teal-600 mt-16 border-teal-800 border-2">
            <div className="w-5/12 flex flex-col space-y-4">
              <h2 className="text-white font-bold text-3xl border-black border-b-2">
                Id
              </h2>
              <h2 className="text-white font-bold text-3xl border-black border-b-2">
                Name
              </h2>
              <h2 className="text-white font-bold text-3xl border-black border-b-2">
                Latitude
              </h2>
              <h2 className="text-white font-bold text-3xl border-black border-b-2">
                Longitude
              </h2>
              <h2 className="text-white font-bold text-3xl border-black border-b-2">
                Header
              </h2>
            </div>
            <div className="w-7/12 flex flex-col space-y-4  ">
              <h2 className="text-teal-200 font-bold text-3xl border-black border-b-2">
                {crossing.id}
              </h2>
              <h2 className="text-teal-200 font-bold text-3xl border-black border-b-2">
                {crossing.name}
              </h2>
              <h2 className="text-teal-200 font-bold text-3xl border-black border-b-2">
                {crossing.latitude}
              </h2>
              <h2 className="text-teal-200 font-bold text-3xl border-black border-b-2">
                {crossing.longitude}
              </h2>
              <h2 className="text-teal-200 font-bold text-3xl border-black border-b-2">
                {crossing.header}
              </h2>
            </div>
          </div>
          );
        })
      ) : (
        <h2>There is no crossing</h2>
      )}
    </div>
  );
}
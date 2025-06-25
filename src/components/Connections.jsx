import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchConnection();
  }, []);


  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="text-center text-2xl p-4">No Connection Found</h1>;

  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl text-white">Connections</h1>
        {connections.filter(Boolean).map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex m-4 p-4 rounded-lg bg-base-300 w-8/12 mx-auto"
            >
              <div className="w-28">
                <img
                  src={photoUrl}
                  className="w-20 h-20 rounded-full object-cover"
                  alt="photo"
                />
              </div>
              <div className="text-left mx-4 w-full">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                {gender && age && <p>{age + " " + gender}</p>}
                <p>{about}</p>
              </div>
             
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;

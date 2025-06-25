import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="text-center text-2xl p-4">No Request Found</h1>;
  return (
    <>
      <div className="text-center my-10">
        <h1 className="text-bold text-3xl text-white">Connections Request</h1>
        {requests.filter(Boolean).map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex  justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
            >
              <div className="flex">
                <div>
                  <img
                    src={photoUrl}
                    className="w-20 h-20 rounded-full"
                    alt="photo"
                  />
                </div>
                <div className="text-left mx-7">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {gender && age && <p>{age + " " + gender}</p>}
                  <p>{about}</p>
                </div>
              </div>

              <div className="flex mx-10">
                <button
                  className="btn btn-primary mx-3"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;

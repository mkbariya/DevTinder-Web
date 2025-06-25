import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (error) {
      setError(error.response.data || "Something went wrong");
      console.log(error);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res.data.data));
       return navigate("/profile");
    } catch (error) {
      setError(error.response.data || "Something went wrong");
    }
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">
              {isLoginForm ? "Login" : "SignUp"}
            </h2>
            <div>
              {!isLoginForm && (
                <>
                  <fieldset className="fieldset py-2">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset py-2">
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </fieldset>
                </>
              )}
              <fieldset className="fieldset py-2">
                <legend className="fieldset-legend">Email ID</legend>
                <input
                  type="text"
                  className="input"
                  value={emailId}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset py-2">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type="text"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-center py-2">
              <button
                className="btn btn-primary"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "SignUp"}
              </button>
            </div>
            <p
              className=" mx-auto cursor-pointer py-2"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Signup Here"
                : "Existing User? Login Here"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import NavBar from "../assets/NavBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const PasswordRoute = () => {
  const [filePassword, setFilePassword] = useState("");
  const token = localStorage.getItem("jwt");
  const passwordSubmit = async () => {
    try {
      const res = await fetch("http://localhost:4000/user/filePass", {
        headers: {
          authorization: token as string,
          password:filePassword
        },
        mode: "cors",
        method: "POST",
      });
      const data = await res.json();
      const a = toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "green",
          backgroundColor: "rgb(183, 248, 183)",
        },
      });
      if (a == 1) {
        setTimeout(() => {
          window.location.reload();
          localStorage.removeItem("jwt");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <NavBar />
      <ToastContainer autoClose={1000} />
      <div className={"Auth-form card-light mx-auto mt-5"}>
        <div className="Auth-form-content">
          <h3 className={"card-title text-center mb-2 text-dark"}>
            Enter File Password
          </h3>
          <div className="text-center"></div>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password "
              value={filePassword}
              onChange={(e) => setFilePassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={passwordSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordRoute;

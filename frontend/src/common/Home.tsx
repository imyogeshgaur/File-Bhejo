import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../assets/NavBar";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");
  const [name, setName] = useState<string>("");
  const [file, setFile] = useState<any>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (token) {
      fetch(`http://localhost:4000/user/verify?token=${token}`, {
        mode: "cors",
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => setName(data.name))
        .catch((err) => console.log(err));
    } else {
      navigate("/");
    }
  }, []);

  const updateDetails = async () => {
    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("filePassword", password);
    try {
      const res = await fetch("http://localhost:4000/user/uploadFile", {
        headers: {
          authorization: token as string,
        },
        mode: "cors",
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const a = toast.success(data.message, {
        position: toast.POSITION.TOP_CENTER,
        closeOnClick: false,
        closeButton: false,
        style: {
          color: "green",
          backgroundColor: "rgb(183, 248, 183)"
        }
      })
      if (a == 1) {
        setTimeout(() => {
          window.location.reload()
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar name={name} />
      <ToastContainer autoClose={1000} />
      <div className={"Auth-form card-light mx-auto mt-5"}>
        <div className="Auth-form-content">
          <h3 className={"card-title text-center mb-2 text-dark"}>
            Upload and Share
          </h3>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Select File</label>
            <input
              type="file"
              className="form-control mt-1"
              title="Select file To Share"
              onChange={(e) => {
                if (!e.target.files) return;
                setFile(e.target.files[0]);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Password (optional)</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 my-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={updateDetails}
            >
              Share File
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

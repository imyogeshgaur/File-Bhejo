import NavBar from "../assets/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const MergeFile = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [files, setFiles] = useState<any>([]);

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

  const mergePdf = async () => {
    if (!files) {
    } else {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("pdf", files[i]);
      }
      try {
        const res = await fetch("http://localhost:4000/user/mergeFiles", {
          method: "POST",
          mode: "cors",
          body: formData,
          headers: {
            authorization: token as string,
          },
        });
        const data = await res.json();
        if (data.message === "File Merged Successfully !!!") {
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
            }, 2000);
          }
        } else {
          const a = toast.error(data.message, {
            position: toast.POSITION.TOP_CENTER,
            closeOnClick: false,
            closeButton: false,
            style: {
              color: "red",
              backgroundColor: "rgb(255, 206, 206)"
            }
          })
          if (a == 1) {
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const downloadPdf = async()=>{
      try {
          const a = toast.success("File Downloading Started !!!", {
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
            }, 2000);
          }
      } catch (error) {
        console.log(error);
      }
  }
  return (
    <>
      <NavBar name={name} />
      <ToastContainer autoClose={1000} />
      <div className={"Auth-form card-light mx-auto mt-5"}>
        <div className="Auth-form-content">
          <h3 className={"card-title text-center mb-2 text-dark"}>
            Merge Pdf here
          </h3>
          <div className="form-group mt-3">
            <label className={"text-dark"}>Select all Pdf</label>
            <input
              type="file"
              className="form-control mt-1"
              title="Select files"
              onChange={(e) => setFiles(e.target.files)}
              multiple={true}
            />
          </div>
          <div className="flex my-3">
          <button
            className="btn btn-primary mx-auto"
            onClick={mergePdf}
          >
            Merge Files
          </button>
          <a
            className="btn btn-success mx-5"
            onClick={downloadPdf}
            href={"http://localhost:4000/user/downloadFile"}
          >
            Download Merged File
          </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MergeFile;

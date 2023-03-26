import NavBar from "../assets/NavBar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const MergeFile = () => {
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [files, setFiles] = useState<any>("")

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

  const mergePdf = async()=>{
      try {
          
      } catch (error) {
        
      }
  }

  return (
    <>
      <NavBar name={name} />
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
              onChange={(e)=>setFiles(e.target.files)}
              multiple={true}
            />
          </div>
        <button className="btn btn-primary mx-auto w-100 my-3" onClick={mergePdf}>Merge Files</button>
        </div>
      </div>
    </>
  );
};

export default MergeFile;

import NavBar from '../assets/NavBar'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useState } from 'react';

const PasswordRoute = () => {
  const [password, setpassword] = useState<string>("")
  const token = localStorage.getItem
  const passwordSubmit = () =>{
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <>
        <NavBar />
        <ToastContainer autoClose={1000} />
        <div className={"Auth-form card-light mx-auto mt-5"}>
          <div className="Auth-form-content">
            <h3 className={"card-title text-center mb-2 text-dark"}>Enter File Password</h3>
            <div className="text-center">
            </div>
            <div className="form-group mt-3">
              <label className={"text-dark"}>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password "
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-danger" onClick={passwordSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default PasswordRoute
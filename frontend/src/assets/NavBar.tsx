import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdAddToPhotos } from "react-icons/md";

const NavBar = (props: any) => {
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const addFiles = () => {
    navigate("/file/merge");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-danger">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {props.name ? (
                <div className="navbar-brand text-white">
                  Welcome {props.name}
                </div>
              ) : (
                <div className="navbar-brand text-white">Secure Share</div>
              )}
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              {props.name && location.pathname === "/user/verify" ? (
                <>
                  <div className="navbar-brand text-white">
                    <MdAddToPhotos
                      color={"white"}
                      size={28}
                      className="me-3"
                      onClick={addFiles}
                    />
                    <FiLogOut color={"white"} size={28} onClick={logoutUser} />
                  </div>
                </>
              ) : (
                <>
                  <div className="navbar-brand text-white">
                    <FiLogOut color={"white"} size={28} onClick={logoutUser} />
                  </div>
                </>
              )}
              {props.name === undefined ? (
                <div className="navbar-brand text-white"></div>
              ) : (
                ""
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

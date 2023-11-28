import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Perform any asynchronous tasks if needed

    // Use the navigate function to redirect to the desired route
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg bs-body-tertiary"
      style={{ backgroundColor: "black" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ color: "white" }}>
          <img src="public/ClubBox.png" width="80" height="30" alt="Logo" />
        </a>
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
        <div
          className="d-flex justify-content-end align-items-center collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <Link to={"/home"}>
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                  style={{ color: "white" }}
                >
                  Home
                </a>
              </li>
            </Link>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                aria-disabled="true"
                style={{ color: "white" }}
              >
                Clubs
              </a>
            </li>
            <Link to={"/faqpage"}>
              <li className="nav-item">
                <a
                  className="nav-link disabled"
                  aria-disabled="true"
                  style={{ color: "white" }}
                >
                  FAQ
                </a>
              </li>
            </Link>
          </ul>
          <div
            className="dropdown"
            style={{
              border: "5px solid maroon",
              borderRadius: "70%",
              display: "flex",
              alignItems: "center",
              marginRight: "5px",
              marginLeft: "10px",
              padding: "1px",
            }}
          >
            <button
              style={{
                display: "flex",
                marginRight: "2px",
                marginLeft: "2px",
                padding: "2px",
              }}
              className="btn"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            >
              <img
                className="rounded-circle"
                height="27"
                width="27"
                src="public/profile.png"
                alt="Profile"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Admission
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#" onClick={handleSubmit}>
                  <button type="button" className="btn btn-danger">
                    Log out
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

function NavBar() {
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
          <form className="me-auto mb-2 mb-lg-0" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>

          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#"
                style={{ color: "grey" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" style={{ color: "white" }}>
                Shop
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                style={{ color: "white" }}
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ color: "white" }}
                  >
                    Action
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ color: "white" }}
                  >
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    style={{ color: "white" }}
                  >
                    Something else here
                  </a>
                </li>
              </ul>
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
          </ul>

          <div
            style={{
              border: "5px solid maroon",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              marginRight: "5px",
              marginLeft: "40px",
              padding: "2px",
            }}
          >
            <img
              className="rounded-circle"
              height="40"
              width="40"
              src="public/profile.png"
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

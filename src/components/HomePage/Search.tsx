import "./Search.css"; // Import the CSS file

function Search() {
  return (
    <div
      className="search-container"
      style={{
        display: "flex",
        alignItems: "center",
        marginRight: "2px", // Adjusted marginRight
        marginLeft: "5px", // Adjusted marginLeft
        padding: "1px",
        position: "relative",
      }}
    >
      <div className="contact">
        <form>
          <input
            type="text"
            name="PlateNumber"
            placeholder="Enter Your Plate Number"
          />
          <input type="submit" name="submit" id="email" value="Submit" />
        </form>
      </div>
      <div
        className="dropdown"
        style={{
          position: "absolute",
          right: "0",
        }}
      >
        <button
          style={{
            display: "flex",
            marginRight: "23vw",
            marginLeft: "2px",
            padding: "2px",
          }}
          className="btn"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        ></button>

        <button
          className="btn btn-secondary dropdown-toggle details"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filters
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Social Science{" "}
                </label>
              </div>
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Electrical{" "}
                </label>
              </div>
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Computing{" "}
                </label>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Search;

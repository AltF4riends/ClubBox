import React from "react";
import { Link } from "react-router-dom";

const EditClubAnnouncement = () => {
  const announcementLargeTitle = {
    height: "5vh",
    width: "65vw",
  };

  const announcementTitle = {
    height: "8vh",
    width: "60vw",
  };

  const announcementBody = {
    height: "50vh",
    width: "60vw",
  };

  return (
    <div
      style={{
        display: "flex",
        height: "89vh",
        width: "100vw",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form>
        <div
          style={{
            display: "flex",
            height: "75vh",
            width: "75vw",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderRadius: "45px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={announcementLargeTitle}>
            <h1
              style={{
                textAlign: "center",
                color: "maroon",
              }}
            >
              Make a Club Announcement
            </h1>
          </div>

          <div className="form-group" style={announcementTitle}>
            <label
              htmlFor="exampleFormControlTextarea1"
              style={{ fontSize: "24px" }}
            >
              Club Announcement Title
            </label>
            <input
              type="text"
              className="form-control"
              id=""
              placeholder="Club Announement Title"
            />
          </div>

          <div className="form-group" style={announcementBody}>
            <label
              htmlFor="exampleFormControlTextarea1"
              style={{ fontSize: "24px" }}
            >
              Club Announcement Body
            </label>
            <textarea
              className="form-control"
              id="announcementBody"
              rows={20}
              placeholder="Type in your Club Announcement"
            ></textarea>
          </div>

          <div>
            <Link to={"/manage_club"}>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{
                  width: "400px",
                }}
              >
                Save and Publish Club Announcement
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditClubAnnouncement;

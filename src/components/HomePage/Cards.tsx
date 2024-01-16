import { Link } from "react-router-dom";

function Cards({
  image,
  title,
  desc,
  eventFee,
  logo,
  eventId,
}: {
  image: string;
  title: string;
  desc: string;
  eventFee: string;
  logo: string;
  eventId?: string | null;
}) {
  return (
    <div className="card" style={{ width: "18rem", marginRight: "30px" }}>
      <Link
        to={`/event/${eventId}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img
          src={image !== "" ? image : "/event.png"}
          className="card-img-top"
          alt="..."
          style={{ width: "286px", height: "250px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h5>
              <b>Price :</b>
            </h5>
            <button
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginLeft: "10px",
                cursor: "pointer",
                borderRadius: "10px",
              }}
            >
              <b>{eventFee}RM</b>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Cards;

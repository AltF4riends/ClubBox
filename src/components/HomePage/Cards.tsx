import { Link } from "react-router-dom";

function Cards({
  image,
  title,
  desc,
  price,
  logo,
  eventId,
}: {
  image: string;
  title: string;
  desc: string;
  price: string;
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
          src={image !== "" ? image : "../../../public/event.png"}
          className="card-img-top"
          alt="..."
          style={{ width: "286px", height: "250px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{desc}</p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img
              src={logo !== "" ? logo : "../../../public/event.png"}
              style={{ borderRadius: "50%", width: "50px", height: "40px" }}
            />
            <h5 style={{ paddingLeft: "70px" }}>
              <b>{price}</b>
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Cards;

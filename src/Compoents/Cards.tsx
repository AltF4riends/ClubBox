function Cards({
  image,
  title,
  desc,
  price,
  logo,
}: {
  image: string;
  title: string;
  desc: string;
  price: string;
  logo: string;
}) {
  return (
    <div className="card" style={{ width: "18rem", marginRight: "30px" }}>
      <img
        src={image}
        className="card-img-top"
        alt="..."
        style={{ width: "286px", height: "250px" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{desc}</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            src={logo}
            style={{ borderRadius: "50%", width: "50px", height: "40px" }}
          />
          <h5 style={{ paddingLeft: "70px" }}>
            <b>{price}</b>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Cards;

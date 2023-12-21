type AMData = {
  aboutMe: String,
}

type AMProps = AMData & {
  updateFields:(fields: Partial<AMData>) => void
}

const AboutMe = ({aboutMe, updateFields}:AMProps) => {
  return (
    <div>
      <h6 style={{textAlign: "center"}}>
        Write a Maximum of 300 Words About Yourself For Others To See (This
        Will Help For Club Admissions)
      </h6>
      <br />

      <div className="mb-3">
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={10}
          cols={100}
          placeholder="Start Typing..."
          onChange={(e) => updateFields({aboutMe: e.target.value})}
        ></textarea>
      </div>

        {/* <div
          style={{
            display: "flex",
            marginTop: "25px",
            width: 520 + "px",
            height: 100 + "px",
            alignItems: "flex-end",
            justifyContent: "right",
          }}>
            <Link to={"/additional_info"}>
              <button
                type="button"
                className="btn btn-light btn-lg"
                style={buttonFormat}
              >
                Save
              </button>
            </Link>
          </div> */}
    </div>
  );
};

export default AboutMe;

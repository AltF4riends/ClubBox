function ForgotPasswordQNA({ formData, setFormData }: any) {
  return (
    <div className="forgotPWQNA">
      <h6>
        Provide Answers For These Simple Questions For Additional Options When
        The Password Is Inaccessible{" "}
      </h6>
      <br />
      <label htmlFor="FfvNum" className="form-label">
        What Is Your Favourite Number?
      </label>
      <input
        type="text"
        className="form-control"
        id="FfvNum"
        placeholder=""
        aria-label="Favourite Number"
        value={formData.answerSQ1}
      />
      <br />
      <label htmlFor="occUncle" className="form-label">
        What is the Occupation of your Uncle?
      </label>
      <input
        type="text"
        className="form-control"
        id="occUncle"
        placeholder=""
        aria-label="Occupation of Uncle"
        value={formData.answerSQ2}
      />
      <br />
      <label htmlFor="bstF" className="form-label">
        What is the name of your best Friend?
      </label>
      <input
        type="text"
        className="form-control"
        id="bstF"
        placeholder=""
        aria-label="Best Friend"
        value={formData.answerSQ3}
      />
    </div>
  );
}

export default ForgotPasswordQNA;

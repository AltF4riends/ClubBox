// EditPersonalDetailsPage.tsx

import React from "react";
import BackgroundEditPersonalDetails from "./EditPersonalDetails/BackgroundEditPersonalDetails";
import InputTextEditPersonalDetails from "./EditPersonalDetails/InputTextEditPersonalDetails";

const EditPersonalDetailsPage = () => {
  let heading1 = "Email Address";
  let heading2 = "Password";
  let heading3 = "Full Name";
  let heading4 = "Age";
  let heading5 = "Phone Number";

  return (
    <BackgroundEditPersonalDetails>
      <InputTextEditPersonalDetails
        heading1={heading1}
        heading2={heading2}
        heading3={heading3}
        heading4={heading4}
        heading5={heading5}
      />
    </BackgroundEditPersonalDetails>
  );
};

export default EditPersonalDetailsPage;

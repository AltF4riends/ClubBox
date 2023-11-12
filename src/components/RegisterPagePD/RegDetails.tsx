import { ReactNode, useContext } from "react";
import { FormPageContext } from "../../contexts/FormPageContext";

interface Props {
    children: ReactNode;
  }
//work on spacing

function RegDetails ({ formData, setFormData }: any) {
    const {regPage, setRegPage}:any = useContext(FormPageContext);
    return(
    <div>
        <form className="row g-3">
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="First Name" aria-label="First Name" value={formData.firstName}/>
                    <br/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Last Name" aria-label="Last Name" value={formData.lastName}/>
                    <br/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="mtrNum" className="form-label">Matric No.</label>
                    <input type="text" className="form-control" id="mtrNum" placeholder="eg. A20EC0000" aria-label="Matric Number" value={formData.matricNumber}/>
                    <br/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="yrcse" className="form-label">Year/Course</label>
                    <input type="text" className="form-control" id="yrcse" placeholder="eg. 3/SECJH" aria-label="YearCourse" value={formData.yearCourse}/>
                    <br/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="phNum" className="form-label">Phone Number</label>
                    <input type="text" className="form-control" id="phNum" placeholder="eg. 0123456789" aria-label="Phone Number" value={formData.phoneNo}/>
                    <br/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="curAddress" className="form-label">Current Address</label>
                    <input type="text" className="form-control" id="curAddress" placeholder="" aria-label="Current Address" value={formData.currAddress}/>
                    <br/>
                </div>

                <div className="col-12">
                    <label htmlFor="utmEmail" className="form-label">UTM Graduate Email</label>
                    <input type="text" className="form-control" id="utmEmail" placeholder="example@graduate.utm.my" aria-label="UTM Email" value={formData.utmEmail}/>
                    <br/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="pwd" className="form-label">Password</label>
                    <input type="text" className="form-control" id="pwd" placeholder="" aria-label="Password" value={formData.password}/>
                    <br/>
                </div>

                <div className="col-md-6">
                    <label htmlFor="conPwd" className="form-label">Confirm Password</label>
                    <input type="text" className="form-control" id="conPwd" placeholder="" aria-label="Confirm Password" value={formData.confirmPassword}/>
                    <br/>
                </div>
            </div>

        </form>
    </div>
    )
}

export default RegDetails;
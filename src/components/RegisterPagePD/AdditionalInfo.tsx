import {useContext} from 'react'
import { FormPageContext } from '../../contexts/FormPageContext';

function AdditionalInfo({formData, setFormData}:any) {
  const {regPage, setRegPage}:any = useContext(FormPageContext);
  const buttonFormat = 
  {
    border: "2px solid maroon",
    color: "maroon",
    padding: "15px 32px",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "50px",
    width: "300px",
  }

  return (
    <div    
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}>
      <h6 style = {{
          textAlign: "center",
          }}> You May Perform This Later In the Settings {'->'} Profile </h6>
      <div
        style={{
          marginTop: 25+"px",
          width: "300px",
          height: "100px",
          justifyContent: "space-around",
      }}>
      <button type="button" className="btn btn-light" style={buttonFormat} onClick={() => setRegPage((currPage:any) => currPage = 3)}>About Me</button>
      </div>

      <div
      style={{
        marginTop: 25+"px",
        width: "300px",
        height: "100px",
    }}>
      <button type="button" className="btn btn-light" style={buttonFormat} onClick={() => setRegPage((currPage:any) => currPage = 4)}>Upload Profile Picture</button>
      </div>

      <div
      style={{
        marginTop: 25+"px",
        width: "300px",
        height: "100px",
    }}>
      <button type="button" className="btn btn-light" style={buttonFormat} onClick={() => setRegPage((currPage:any) => currPage = 5)}>Upload Video of Introduction</button>
      </div>
    </div>
  );
}

export default AdditionalInfo
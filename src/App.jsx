import { useState } from "react";
import "./App.css";

function App() {
  const [formData , setFormData] =useState(
    {
      firstname : "",
      lastname : "",
      email : "",
      message:"",
      qyerytype: "",
      consent:false
    }
  )
  function handleOnsubmitForm(event){
      event.preventDefault();
      console.log(formData);

  }
  function handleOnChange(event){
      const keyName = event.target.name;
      var keyValue = event.target.value;
      const type = event.target.type;
      if(type === "checkbox"){
        keyValue = event.target.checked;
      }
       setFormData({
        ...formData,[keyName]:keyValue
       })
  }
  return (
    <>
      <div className="toast hidden">
        <div>
          <img src="/images/icon-success-check.svg" alt="toast check" />
          <span>Message Sent!</span>
        </div>
        <p>Thanks For completing the form. We'll be in touch soon!</p>
      </div>
      <div className="form-container">
        <h1>Contact Us</h1>
        <form className="form" onSubmit={handleOnsubmitForm}>
          <div className="name-inputs">
            <div className="form-group">
              <label htmlFor="first-name">
                First Name <span className="star">*</span>
              </label>
              <input type="text" id="first-name" name="firstname" value={formData.firstname} onChange={handleOnChange} required />
              <span className="error hidden">This field is required</span>
            </div>
            <div className="form-group">
              <label htmlFor="last-name">
                Last Name <span className="star">*</span>
              </label>
              <input type="text" id="last-name" name="lastname" value={formData.lastname} onChange={handleOnChange} required />
              <span className="error hidden">This field is required</span>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="star">*</span>
            </label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleOnChange} required />
            <span className="error valid hidden">
              Please enter a valid email address
            </span>
            <span className="error empty hidden">This field is required</span>
          </div>
          <div className="form-group radio">
            <label htmlFor="query">
              Query Type <span className="star">*</span>
            </label>
            <div id="query">
              <div className="query-type">
                <input
                  type="radio"
                  id="option1"
                  name="querytype"
                  value="General Enquiry" 
                  onChange={handleOnChange}
                  required
                />
                <label htmlFor="option1">General Enquiry</label>
              </div>
              <div className="query-type">
                <input
                  type="radio"
                  id="option2"
                  name="querytype"
                  value="Support Request" 
                  onChange={handleOnChange}
                  required
                />
                <label htmlFor="option2">Support Request</label>
              </div>
            </div>
            <span className="error hidden">Please select a query type</span>
          </div>
          <div className="form-group">
            <label htmlFor="message">
              Message <span className="star">*</span>
            </label>
            <textarea id="message" rows="4" name="message" value={formData.message} onChange={handleOnChange} required></textarea>
            <span className="error hidden">This field is required</span>
          </div>
          <div className="form-group checkbox">
            <div>
              <input type="checkbox" id="consent" name="consent" onChange={handleOnChange} checked={formData.consent} required />
              <label htmlFor="consent">
                I consent to being contacted by the team
                <span className="star">*</span>
              </label>
            </div>
            <span className="error hidden">
              To submit this form, please consent to being contacted
            </span>
          </div>
          <button type="submit" disabled={formData.consent ? false : true}>Submit</button>
        </form>
      </div>
    </>
  );
}
export default App;

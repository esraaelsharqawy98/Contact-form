import { useState } from "react";
import "./App.css";
import * as yup from "yup"; //library for validation

function App() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
    querytype: "",
    consent: false,
  });

  const [error, setError] = useState({});
  const [toastVisible, setToastVisible] = useState(false);

  const userSchema = yup.object().shape({
    firstname: yup.string().required("This field is required"),
    lastname: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("This field is required"),
    message: yup.string().required("This field is required"),
    querytype: yup
      .string()
      .required()
      .oneOf(
        ["General Enquiry", "Support Request"],
        "Please select a query type"
      ),
    consent: yup
      .boolean()
      .oneOf([true], "To submit this form, please consent to being contacted")
      .required(),
  });

  async function formValidation() {
    try {
      const res = await userSchema.validate(formData, { abortEarly: false });
      setError({});
      return true;
    } catch (e) {
      const newErrors = {};
      e.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setError(newErrors);
      return false;
    }
  }

  async function handleOnsubmitForm(event) {
    event.preventDefault();
    const isValid = await formValidation();
    if (isValid) {
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        querytype: "",
        consent: false,
      });
    }
  }

  function handleOnChange(event) {
    const keyName = event.target.name;
    let keyValue = event.target.value;
    const type = event.target.type;
    if (type === "checkbox") {
      keyValue = event.target.checked;
    }
    setFormData({
      ...formData,
      [keyName]: keyValue,
    });
  }

  return (
    <>
      <div className={`toast ${toastVisible ? "" : "hidden"}`}>
        <div>
          <img src="/images/icon-success-check.svg" alt="toast check" />
          <span>Message Sent!</span>
        </div>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
      </div>
      <div className="form-container">
        <h1>Contact Us</h1>
        <form className="form" onSubmit={handleOnsubmitForm}>
          <div className="name-inputs">
            <div className="form-group">
              <label htmlFor="first-name">
                First Name <span className="star">*</span>
              </label>
              <input
                type="text"
                id="first-name"
                name="firstname"
                value={formData.firstname}
                onChange={handleOnChange}
              />
              {error.firstname && (
                <span className="error">{error.firstname}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="last-name">
                Last Name <span className="star">*</span>
              </label>
              <input
                type="text"
                id="last-name"
                name="lastname"
                value={formData.lastname}
                onChange={handleOnChange}
              />
              {error.lastname && (
                <span className="error">{error.lastname}</span>
              )}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="star">*</span>
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
            {error.email && <span className="error">{error.email}</span>}
          </div>
          <div className="form-group radio">
            <label htmlFor="query">
              Query Type <span className="star">*</span>
            </label>
            <div id="query">
              <div className={`query-type ${formData.querytype === "General Enquiry" && "radio-selected"}`}>
                <input
                  type="radio"
                  id="option1"
                  name="querytype"
                  value="General Enquiry"
                  onChange={handleOnChange}
                  checked={formData.querytype === "General Enquiry"}
                />
                <label htmlFor="option1">General Enquiry</label>
              </div>
              <div className={`query-type ${formData.querytype === "Support Request" && "radio-selected"}`}>
                <input
                  type="radio"
                  id="option2"
                  name="querytype"
                  value="Support Request"
                  onChange={handleOnChange}
                  checked={formData.querytype === "Support Request"}
                />
                <label htmlFor="option2">Support Request</label>
              </div>
            </div>
            {error.querytype && (
              <span className="error">{error.querytype}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message">
              Message <span className="star">*</span>
            </label>
            <textarea
              id="message"
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleOnChange}
            ></textarea>
            {error.message && <span className="error">{error.message}</span>}
          </div>
          <div className="form-group checkbox">
            <div>
              <input
                type="checkbox"
                id="consent"
                name="consent"
                onChange={handleOnChange}
                checked={formData.consent}
              />
              <label htmlFor="consent">
                I consent to being contacted by the team
                <span className="star">*</span>
              </label>
            </div>
            {error.consent && <span className="error">{error.consent}</span>}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;

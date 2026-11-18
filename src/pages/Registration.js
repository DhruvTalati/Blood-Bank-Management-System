import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
 
import FormInput from "../components/FormInput";
import BloodGroupDropdown from "../components/BloodGroupDropdown";
import PasswordInput from "../components/PasswordInput";
import FormSection from "../components/FormSection";
 
function Registration() {
  const navigate = useNavigate();
 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    bloodGroup: "",
    city: "",
    password: "",
    confirmPassword: "",
    consent: false,
  });
 
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
 
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
 
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
 
  const validate = () => {
    const newErrors = {};
 
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
 
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
 
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must contain 10 digits.";
    }
 
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required.";
    }
 
    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Please select a blood group.";
    }
 
    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
    }
 
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must contain at least 6 characters.";
    }
 
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
 
    if (!formData.consent) {
      newErrors.consent = "You must accept the declaration.";
    }
 
    setErrors(newErrors);
 
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    setServerError("");
 
    if (!validate()) {
      return;
    }
 
    // Note: a donor record isn't a login account, so the password fields
    // above are collected/validated for the form flow but aren't part of
    // the Donor schema and are intentionally not sent to the API.
    try {
      setSubmitting(true);
 
      const response = await API.post("/donors", {
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        dateOfBirth: formData.dob,
        bloodGroup: formData.bloodGroup,
        city: formData.city,
      });
 
      if (response.data.success) {
        setSuccess(true);
 
        setTimeout(() => {
          navigate("/donors");
        }, 1200);
      }
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Unable to register donor.",
      );
    } finally {
      setSubmitting(false);
    }
  };
 
  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      dob: "",
      bloodGroup: "",
      city: "",
      password: "",
      confirmPassword: "",
      consent: false,
    });
 
    setErrors({});
    setSuccess(false);
    setServerError("");
  };
 
  return (
    <div className="registration-page">
      <div className="page-header">
        <div>
          <p className="page-kicker">Registry</p>
          <h1>Register donor</h1>
          <p>Add a new blood donor to the LifeLine network.</p>
        </div>
 
        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/donors")}
        >
          ← Back to Donors
        </button>
      </div>
 
      {success && (
        <div className="success-banner">
          <strong>✓ Registration Successful!</strong>
 
          <span>Donor has been added successfully. Redirecting...</span>
        </div>
      )}
 
      {serverError && (
        <div className="request-message error">{serverError}</div>
      )}
 
      <form onSubmit={handleSubmit}>
        <FormSection icon="01" title="Personal information" subtitle="Identity and contact details">
          <FormInput
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
            error={errors.fullName}
          />
 
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            error={errors.email}
          />
 
          <FormInput
            label="Mobile Number"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
            error={errors.mobile}
          />
 
          <FormInput
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />
        </FormSection>
 
        <FormSection icon="02" title="Blood and location" subtitle="Group and city of residence">
          <BloodGroupDropdown
            value={formData.bloodGroup}
            onChange={handleChange}
            error={errors.bloodGroup}
          />
 
          <FormInput
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter city"
            error={errors.city}
          />
        </FormSection>
 
        <FormSection icon="03" title="Account security" subtitle="Used only for this registration form">
          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
            error={errors.password}
          />
 
          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            error={errors.confirmPassword}
          />
        </FormSection>
 
        <div className="declaration-box">
          <label>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
 
            <span>
              I confirm that the information provided is accurate and I agree
              to register as a blood donor.
            </span>
          </label>
 
          {errors.consent && (
            <div className="field-error">{errors.consent}</div>
          )}
        </div>
 
        <div className="form-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={handleReset}
          >
            Reset
          </button>
 
          <button
            type="submit"
            className="primary-btn"
            disabled={success || submitting}
          >
            {success
              ? "Registered ✓"
              : submitting
                ? "Registering..."
                : "Register Donor"}
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default Registration;
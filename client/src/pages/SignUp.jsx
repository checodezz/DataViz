import { useState } from "react";
import InputField from "../utils/InputField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../utils/constants";
const SignUp = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const redirectUrl = new URLSearchParams(location.search).get("redirect");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/user/signup`, formData);
      if (response.status === 201) {
        toast.success(
          "Account created successfully! Please login to continue."
        );
        setTimeout(() => {
          navigate(redirectUrl || `/`);
        }, 1000);
        toast.success("Login to Explore.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Sign-up failed");
      toast.error(error.response?.data?.message || "Sign-up failed");
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-column justify-content-center align-items-center mt-4">
        <h1 className="text-secondary my-3 pb-3">
          Welcome to <span className="text-primary">Data</span>Viz
        </h1>
        <div
          className="bg-body-tertiary p-4 shadow"
          style={{ borderRadius: "15px", maxWidth: "400px", width: "100%" }}
        >
          <h2 className="pb-1">Join Us Now!</h2>
          <p>
            Already a member?{" "}
            <Link
              to={
                redirectUrl
                  ? `/?redirect=${encodeURIComponent(redirectUrl)}`
                  : "/"
              }
              className="text-decoration-none"
            >
              Sign In
            </Link>
            <br />
            <span
              className="text-muted mt-1 pt-1"
              style={{ fontSize: "15px", fontFamily: "sans-serif" }}
            >
              All fields are mandatory *
            </span>
          </p>

          <form onSubmit={handleFormSubmit}>
            <div className="row g-3 text-muted pt-1">
              <div className="col-md-6">
                <InputField
                  label="Full Name"
                  type="text"
                  placeholder="John / Alex"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-md-12">
                <InputField
                  label="Email"
                  type="email"
                  placeholder="you@company.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <InputField
                  label="Password"
                  type="password"
                  placeholder="a strong password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {errorMessage && <p className="text-danger">{errorMessage}</p>}

              <button
                className="btn btn-primary"
                style={{ borderRadius: "10px" }}
                type="submit"
              >
                Sign Up
              </button>
              <p className="text-decoration-none pb-0 mb-0">
                By clicking the button above you agree to our{" "}
                <Link className="text-decoration-none">terms of use</Link> and{" "}
                <Link className="text-decoration-none">privacy policies</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

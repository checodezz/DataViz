import { useState, useEffect } from "react";
import InputField from "../utils/InputField";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync(formData));
  };

  // useEffect to navigate when isAuthenticated changes to true
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <h1 className="text-secondary pb-5">
        Welcome to <span className="text-primary">Data</span>Viz
      </h1>

      <div
        className="bg-white p-4 shadow bg-body-tertiary"
        style={{ borderRadius: "15px", maxWidth: "400px", width: "100%" }}
      >
        <div className="d-flex justify-content-between">
          <h2 className="pb-2">
            Log<span className="text-primary">in</span>
          </h2>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="row g-3 text-muted pt-1">
            <div className="col-md-12">
              <InputField
                label="Email"
                type="text"
                placeholder="you@company.com"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="col-md-12 pb-3">
              <InputField
                label="Password"
                type="password"
                placeholder="Please enter your password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <button
              className="btn btn-primary w-100"
              style={{ borderRadius: "0px" }}
              type="submit"
            >
              Log In
            </button>

            <p className="text-decoration-none pt-3 text-center mb-0">
              Don't have an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

import { useState, useEffect } from "react";
import InputField from "../utils/InputField";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../redux/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Login = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const redirectUrl = new URLSearchParams(location.search).get("redirect");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    toast.info("Logging in...");
    dispatch(loginUserAsync(formData));
  };

  const handleGuestLogin = () => {
    const guestCredentials = {
      email: "demouser@gmail.com",
      password: "demouser1234",
    };
    toast.info("Logging in as guest...");
    dispatch(loginUserAsync(guestCredentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!");
      navigate(redirectUrl || "/dashboard");
    }
    if (error) {
      console.log(error);
      toast.error(error.error);
    }
  }, [isAuthenticated, error, navigate, redirectUrl]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) return <Spinner />;

  return (
    <div
      className="container ps-5  d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row w-100  g-5">
        <div className="col-md-4">
          <h1 className="text-secondary pb-5">
            Welcome to <span className="text-primary">Data</span>Viz
          </h1>

          <div
            className="bg-white p-4 shadow bg-body-tertiary"
            style={{ borderRadius: "15px" }}
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

                <div className="col-md-12 pb-3 position-relative">
                  <InputField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Please enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "20px",
                      top: "38px",
                      cursor: "pointer",
                      color: "blue",
                    }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Log In
                </button>

                <button
                  type="button"
                  className="btn btn-secondary w-100 mt-3"
                  onClick={handleGuestLogin}
                >
                  Login as Guest
                </button>

                <p className="text-decoration-none pt-3 text-center mb-0">
                  Don't have an account?{" "}
                  <Link
                    to={
                      redirectUrl
                        ? `/signup?redirect=${encodeURIComponent(redirectUrl)}`
                        : "/signup"
                    }
                    className="text-decoration-none"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-8 d-flex align-items-center">
          <div className="p-4 text-muted ">
            <h5 className="mb-3">Note:</h5>
            <p className="mb-2">
              Please test the URL sharing feature in a regular browser tab, not
              in incognito mode.
            </p>
            <p className="mb-2">
              Since cookie-based authentication is used, the backend cannot send
              cookies to an incognito tab.
            </p>
            <p className="mb-0">
              Data is stored using session storage, so it won’t be shared across
              tabs. You can safely check the URL sharing feature in a different
              tab as long as you are authenticated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

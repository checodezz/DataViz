import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation(); // Capture the current location and query params

  if (isAuthenticated) {
    return element;
  }

  const redirectParams = `?redirect=${encodeURIComponent(
    location.pathname + location.search
  )}`;

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <h2 className="mb-4 text-dark">You must log in to access this page.</h2>
      <div className="mb-4">
        <Link to={`/${redirectParams}`} className="btn btn-primary mx-2">
          Go to Login
        </Link>
        <Link
          to={`/signup${redirectParams}`}
          className="btn btn-secondary mx-2"
        >
          Sign Up
        </Link>
      </div>
      <p className="text-muted">
        Don't have an account? Sign up to access more features.
      </p>
    </div>
  );
};

export default PrivateRoute;

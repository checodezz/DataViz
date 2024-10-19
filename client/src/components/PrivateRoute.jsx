import { Link, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation(); // Capture the current location and query params

  if (isAuthenticated) {
    return element;
  }

  // Redirect to login page and pass the current location to preserve the URL
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>You must log in to access this page.</h2>
      <Link
        to={`/?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`}
        className="btn btn-primary"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default PrivateRoute;

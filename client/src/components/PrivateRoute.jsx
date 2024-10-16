import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return element;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>You must log in to access this page.</h2>
      <Link to="/" className="btn btn-primary">
        Go to Login
      </Link>
    </div>
  );
};

export default PrivateRoute;

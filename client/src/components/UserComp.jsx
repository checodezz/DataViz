import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync } from "../redux/authSlice";

const UserComp = () => {
  const dispatch = useDispatch();
  const { fullname } = useSelector((state) => state.auth?.user);

  const handleLogout = () => {
    dispatch(logoutUserAsync());
  };

  return (
    <section className="container mt-2">
      <div className="row align-items-center">
        <div className="col-md-9 text-start">
          <h1 className="text-primary">Hello, {fullname}!</h1>
          <p className="text-secondary">
            Welcome to the <span className="text-primary">DataViz</span>{" "}
            dashboard
          </p>
        </div>

        <div className="col-md-3 text-end">
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserComp;

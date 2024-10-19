import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const UserComp = () => {
  const { fullname } = useSelector((state) => state.auth?.user);

  return (
    <section className="text-center mt-2">
      <h1 className="text-primary">Hello, {fullname}!</h1>
      <p className="text-secondary">
        Welcome to the <span className="text-primary">DataViz</span> dashboard
      </p>
      <p className="text-success">
        Explore the latest trends and analytics tailored just for you.
      </p>
    </section>
  );
};

export default UserComp;

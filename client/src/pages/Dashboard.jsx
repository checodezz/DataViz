import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboardDataAsync } from "../redux/dashboardSlice";
import BarChart from "../components/BarChart";
import UserComp from "../components/UserComp";
import Filters from "../components/Filters";
import { useDashboardFilters } from "../hooks/useDashboardFilters";
import Spinner from "../components/Spinner";
import About from "../components/About";
import Footer from "../components/Footer";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);
  const {
    startDate,
    endDate,
    selectedAge,
    selectedGender,
    setStartDate,
    setEndDate,
    setSelectedAge,
    setSelectedGender,
    resetFilters,
  } = useDashboardFilters();

  useEffect(() => {
    dispatch(fetchDashboardDataAsync());
  }, [dispatch]);

  const filteredData = data?.filter((item) => {
    const itemDate = new Date(item.day.split("/").reverse().join("-"));
    return (
      itemDate >= startDate &&
      itemDate <= endDate &&
      item.age === selectedAge &&
      item.gender === selectedGender
    );
  });

  if (loading) return <Spinner />;

  if (error)
    return <div className="text-danger text-center">Error: {error}</div>;

  return (
    <div className="container mt-3">
      <UserComp />
      <hr />
      <div className="bg-light p-4 rounded shadow-sm my-4">
        <h3 className="text-success text-center fw-bold">
          <i className="bi bi-bar-chart-fill me-2"></i>{" "}
          {/* Adding the chart icon */}
          Explore the Latest Trends and Analytics
        </h3>
        <p className="text-secondary text-center mb-0">
          Tailored just for you. Dive into the insights!
        </p>
      </div>
      <div className="row g-5 mt-1">
        <div className="col-md-3 border-end pe-3">
          <Filters
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            selectedAge={selectedAge}
            setSelectedAge={setSelectedAge}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            resetFilters={resetFilters}
          />
        </div>
        <div className="col-md-9 ms-auto mb-5 pb-5">
          <section className="mb-2 pb-3">
            <h3 className="">Feature Usage Over Time</h3>
            <p className="text-danger">
              * click on any feature to show its Timeline below
            </p>
          </section>
          {filteredData && <BarChart data={filteredData} />}
        </div>
      </div>
      <hr />
      <About />
      <Footer />
    </div>
  );
};

export default Dashboard;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardDataAsync } from "../redux/dashboardSlice"; // Adjust the path accordingly

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard); // Use your slice state

  console.log(data);

  useEffect(() => {
    dispatch(fetchDashboardDataAsync());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render your dashboard data here */}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default Dashboard;

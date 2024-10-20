import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import LineChart from "./LineChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const FilteredBarChart = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const lineChartRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize category from URL query
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const initialCategory = query.get("selectedCategory");
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [location]);

  const categorySums = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  data.forEach((item) => {
    categorySums.A += item.a / 60 || 0;
    categorySums.B += item.b / 60 || 0;
    categorySums.C += item.c / 60 || 0;
    categorySums.D += item.d / 60 || 0;
    categorySums.E += item.e / 60 || 0;
    categorySums.F += item.f / 60 || 0;
  });

  const labels = Object.keys(categorySums).reverse();
  const values = Object.values(categorySums).reverse();

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedCategory = labels[clickedIndex];
      setSelectedCategory(clickedCategory);

      // Update URL with selected category
      const query = new URLSearchParams(location.search);
      query.set("selectedCategory", clickedCategory);
      navigate({ search: query.toString() });

      if (lineChartRef.current) {
        lineChartRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Values (Estimated in Hours)",
        data: values,
        backgroundColor: "rgba(137, 134, 216, 0.6)",
        borderColor: "rgba(137, 134, 216, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y",
    onClick: handleClick,
    plugins: {
      legend: {
        position: "top",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Total Time Spent (Hours) / Feature",
        },
      },
      y: {
        title: {
          display: true,
          text: "Categories (Features)",
        },
      },
    },
  };

  return (
    <div className="row">
      <div className="col-md-10">
        <Bar data={chartData} options={options} />
      </div>
      <div className="col-md-10" ref={lineChartRef}>
        {" "}
        {selectedCategory && (
          <LineChart data={data} selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default FilteredBarChart;

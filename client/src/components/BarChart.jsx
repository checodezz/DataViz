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
import zoomPlugin from "chartjs-plugin-zoom"; // Import the zoom plugin
import { useState } from "react";
import LineChart from "./LineChart"; // Import the new LineChart component

// Register the necessary components and the zoom plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin // Register the zoom plugin
);

const FilteredBarChart = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categorySums = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    E: 0,
    F: 0,
  };

  data.forEach((item) => {
    categorySums.A += item.a / 60 || 0; // Add value for category 'a'
    categorySums.B += item.b / 60 || 0; // Add value for category 'b'
    categorySums.C += item.c / 60 || 0; // Add value for category 'c'
    categorySums.D += item.d / 60 || 0; // Add value for category 'd'
    categorySums.E += item.e / 60 || 0; // Add value for category 'e'
    categorySums.F += item.f / 60 || 0; // Add value for category 'f'
  });

  const labels = Object.keys(categorySums).reverse(); // ['a', 'b', 'c', 'd', 'e', 'f']
  const values = Object.values(categorySums).reverse(); // [sum of a, sum of b, sum of c, ...]

  const handleClick = (event, elements) => {
    if (elements.length > 0) {
      const clickedIndex = elements[0].index;
      const clickedCategory = labels[clickedIndex];
      console.log(`You clicked on: ${clickedCategory}`);
      setSelectedCategory(clickedCategory);
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
          text: "Categories (Features)", // Set title for the Y-axis
        },
      },
    },
  };

  return (
    <div className="row">
      <div className="col-md-10">
        <Bar data={chartData} options={options} />
      </div>
      <div className="col-md-10">
        {selectedCategory && (
          <LineChart data={data} selectedCategory={selectedCategory} />
        )}
      </div>
    </div>
  );
};

export default FilteredBarChart;

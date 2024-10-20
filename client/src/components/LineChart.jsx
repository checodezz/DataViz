import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom"; // Import the zoom plugin

// Register the necessary components and the zoom plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin // Register the zoom plugin
);

const LineChart = ({ data, selectedCategory }) => {
  const getLineChartData = () => {
    const filteredData = data.map((item) => ({
      day: item.day,
      value: item[selectedCategory.toLowerCase()] / 60 || 0,
    }));

    return {
      labels: filteredData.map((item) => item.day), // Extract days for X-axis
      datasets: [
        {
          label: `Timeline for ${selectedCategory}`,
          data: filteredData.map((item) => item.value), // Extract values for Y-axis
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)", // Customize color
          tension: 0.1, // For smooth line
        },
      ],
    };
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy", // Allow panning in both x and y directions
        },
        zoom: {
          enabled: true,
          mode: "xy", // Allow zooming in both x and y directions
          // Optional: you can also define how much you want to zoom
          wheel: {
            enabled: true,
            modifierKey: "ctrl", // Use Ctrl + Mouse Wheel to zoom
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days", // Title for the X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: "Values (Hours)", // Title for the Y-axis
        },
      },
    },
  };

  // This function handles mouse wheel events
  const handleWheel = (event) => {
    if (event.ctrlKey) {
      event.preventDefault(); // Prevent scrolling when holding Ctrl
    }
  };

  return (
    <div
      style={{ position: "relative", height: "400px", width: "100%" }}
      onWheel={handleWheel} // Prevent scrolling when using the mouse wheel
    >
      <h3 className="mt-5">Trend for the feature {selectedCategory}:</h3>
      <Line data={getLineChartData()} options={options} />
    </div>
  );
};

export default LineChart;

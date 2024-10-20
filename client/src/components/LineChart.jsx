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
import zoomPlugin from "chartjs-plugin-zoom"; 

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin 
);

const LineChart = ({ data, selectedCategory }) => {
  const getLineChartData = () => {
    const filteredData = data.map((item) => ({
      day: item.day,
      value: item[selectedCategory.toLowerCase()] / 60 || 0,
    }));

    return {
      labels: filteredData.map((item) => item.day),
      datasets: [
        {
          label: `Timeline for ${selectedCategory}`,
          data: filteredData.map((item) => item.value), 
          fill: false,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1, 
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
          mode: "xy", 
        },
        zoom: {
          enabled: true,
          mode: "xy", 
          wheel: {
            enabled: true,
            modifierKey: "ctrl",
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days", 
        },
      },
      y: {
        title: {
          display: true,
          text: "Values (Hours)", 
        },
      },
    },
  };

  const handleWheel = (event) => {
    if (event.ctrlKey) {
      event.preventDefault();
    }
  };

  return (
    <div
      style={{ position: "relative", height: "400px", width: "100%" }}
      onWheel={handleWheel} 
    >
      <h3 className="mt-5">Trend for the feature {selectedCategory}:</h3>
      <Line data={getLineChartData()} options={options} />
    </div>
  );
};

export default LineChart;

import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
const LineChart = ({ data }) => {
  const currency = useSelector((state) => state.home.currency);
  const time = useSelector((state) => state.home.time);
  const chartOptions = {
    chart: {
      type: "line",
      height: 500,
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: `Price (Past ${
        time == "Hour"
          ? "1 Days"
          : time == "Day"
          ? "30 Days"
          : time == "Month"
          ? "3 Month"
          : "1 Year"
      }) in ${currency}`,
      align: "center",
    },
    xaxis: {
      categories: [
        "8:45 AM",
        "9:15 AM",
        "9:45 AM",
        "10:15 AM",
        "10:45 AM",
        "11:15 AM",
        "11:45 AM",
        "12:15 PM",
        "12:45 PM",
        "1:15 PM",
        "1:45 PM",
        "2:15 PM",
        "2:45 PM",
        "3:15 PM",
        "3:45 PM",
        "4:15 PM",
        "4:45 PM",
        "5:15 PM",
        "5:45 PM",
        "6:15 PM",
        "6:45 PM",
        "7:15 PM",
        "7:45 PM",
        "8:15 PM",
        "8:45 PM",
        "9:15 PM",
        "9:45 PM",
        "10:15 PM",
        "10:45 PM",
        "11:15 PM",
        "11:45 PM",
        "12:15 AM",
        "12:45 AM",
        "1:15 AM",
        "1:45 AM",
        "2:15 AM",
        "2:45 AM",
        "3:15 AM",
        "3:45 AM",
        "4:15 AM",
        "4:45 AM",
        "5:15 AM",
        "5:45 AM",
        "6:15 AM",
        "6:45 AM",
        "7:15 AM",
        "7:45 AM",
        "8:15 AM",
        "8:41 AM",
      ],
      title: {
        text: "Month",
      },
    },
    yaxis: {
      title: {
        text: "Value",
      },
    },
    colors: ["#87CEEB"], // Light blue color
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#e0e0e0",
      strokeDashArray: 5,
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
    },
  };

  const chartSeries = [
    {
      name: "Data Series 1",
      data: data,
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={500}
      width={1000}
    />
  );
};

export default LineChart;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "cookies-js";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement, 
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Legend,
  Tooltip
);
const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const data = {
    labels: ["jan", "feb", "mar", "apr", "may", "june", "july"],
    datasets: [
      {
        label: "#No of users",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <React.Fragment>
      <section className="p-3">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="chart line-chart">
                <Line data={data} />
              </div>
              </div>
                <div className="col-md-3 chart pie-chart">
                <Pie style={{height : '800px'}}  data={data}/>
                </div>
              <div className="chart bar-chart">
              <Bar style={{width : '900px'}}  data={data} />
              </div>
            </div>
          </div>
          <div className="col-md-3"></div>
      </section>
    </React.Fragment>
  );
};

export default Dashboard;

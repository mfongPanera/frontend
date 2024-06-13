import { ArcElement, Legend, Tooltip, Chart as ChartJS } from "chart.js";
import React from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({data}) {
    return (
        <Pie data={data} width="160" height="160"/>
    )
}

export default PieChart;
import numeral from "numeral";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const COLORS = ["#cc103285", "#7dd71d85", "#fb434385"];
const BORDER_COLOR = ["#cc1032", "#72c51a", "#fb4343"];

const options = {
    plugins: {
        legend: {
            display: false,
        },
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem, data) {
                    return numeral(tooltipItem.value).format("+0,0");
                },
            },
        },
    },
    maintainAspectRatio: false,
    responsive: true,
    elements: {
        line: {
            fill: true,
        },
        point: {
            hitRadius: 100,
            radius: 0,
        },
    },
    scales: {
        xAxes: [
            {
                gridLines: {
                    display: false,
                },
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    //Include dollar sign in ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0.0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineGraph({ casesType = "cases", ...props }) {
    const ChartColor = () => {
        if (casesType === "cases") {
            return COLORS[0];
        } else if (casesType === "recovered") {
            return COLORS[1];
        } else {
            return COLORS[2];
        }
    };
    const ChartBorderColor = () => {
        if (casesType === "cases") {
            return BORDER_COLOR[0];
        } else if (casesType === "recovered") {
            return BORDER_COLOR[1];
        } else {
            return BORDER_COLOR[2];
        }
    };

    const [data, setData] = useState({});
    useEffect(() => {
        getHistoricalData();
    }, [casesType]);

    const getHistoricalData = async () => {
        const response = await fetch(
            "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        );
        const data = await response.json();
        let chartData = buildChartData(data, casesType);
        setData(chartData);
    };

    return (
        <div className={props.className}>
            {data?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: ChartColor(),
                                borderColor: ChartBorderColor(),
                                tension: 0.1,
                                data: data,
                            },
                        ],
                    }}
                />
            )}
        </div>
    );
}

export default LineGraph;

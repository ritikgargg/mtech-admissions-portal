import { useEffect } from "react";
import Chart from "chart.js/auto";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";

export default function ChartBar(props) {
  useEffect(() => {
    let config = {
      type: "bar",
      data: {
        labels: props.labels,
        datasets: [
          {
            label: "Applications",
            backgroundColor: "#2DD4BF",
            borderColor: "#2DD4BF",
            data: props.displayData,
            fill: false,
            barThickness: 20,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Category-Wise Applications",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        legend: {
          labels: {
            fontColor: "rgba(17,17,17,.7)",
          },
          align: "end",
          position: "bottom",
        },
        scales: {
          xAxes: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Category",
            },
            gridLines: {
              borderDash: [2],
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.3)",
              zeroLineColor: "rgba(33, 37, 41, 0.3)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
          yAxes: {
            display: true,
            scaleLabel: {
              display: false,
              labelString: "Value",
            },
            gridLines: {
              borderDash: [2],
              drawBorder: false,
              borderDashOffset: [2],
              color: "rgba(33, 37, 41, 0.2)",
              zeroLineColor: "rgba(33, 37, 41, 0.15)",
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };
    let ctx = document.getElementById("bar-chart").getContext("2d");
    window.myBar1 = new Chart(ctx, config);

    return () => {
      window.myBar1.destroy();
    };
  }, [props.displayData]);

  return (
    <Card>
      <CardHeader color="teal" contentPosition="between">
        <div className="flex justify-between">
          <div>
            <h6 className=" text-gray-200 text-sm font-medium">
              {props.currentCycleName}
            </h6>
            <h2 className="text-white text-2xl">Category-Wise Applications</h2>
          </div>
          <div>
            <select
              required
              value={props.currentOffering}
              onChange={(event) => {
                props.setCurrentOffering(event.target.value);
                props.onChange(event.target.value);
              }}
              className="mr-8 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            >
              <option value="">- Select -</option>
              <option value="-1">All Offerings</option>
              {props.offerings.map((offering) => {
                return (
                  <option
                    key={offering.offering_id}
                    value={offering.offering_id}
                  >
                    {" "}
                    {offering.specialization}{" "}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="relative h-96">
          <canvas id="bar-chart"></canvas>
        </div>
      </CardBody>
    </Card>
  );
}

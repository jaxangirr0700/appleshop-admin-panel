import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { OrderTotelType, PostdateType } from "../../types/orderDates";
import { api } from "../../utils/api";

export function ApexChartTotal({
  postDeta,
}: {
  postDeta: PostdateType | undefined;
}) {
  const [orderTotals, setOrderTotals] = useState<OrderTotelType[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const today = new Date();
      const endYear = today.getFullYear();
      const endMonth = String(today.getMonth() + 1).padStart(2, "0");
      const endDay = String(today.getDate()).padStart(2, "0");
      const endDate = `${endYear}-${endMonth}-${endDay}`;

      const prevMonthDate = new Date(today);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      const startYear = prevMonthDate.getFullYear();
      const startMonth = String(prevMonthDate.getMonth() + 1).padStart(2, "0");
      const startDay = String(prevMonthDate.getDate()).padStart(2, "0");
      const startDate = `${startYear}-${startMonth}-${startDay}`;

      const datePayload = { startDate, endDate };

      api
        .post(
          "https://nt.softly.uz/api/statistics/daily-order-totals",
          postDeta ? postDeta : datePayload
        )
        .then((res) => {
          setOrderTotals(res.data || []);
        })
        .catch((e) => {
          console.error(e.response?.data || e.message);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [postDeta]);

  return (
    <div className="container">
      <ReactApexChart
        type="line"
        height={350}
        series={[
          {
            name: "Buyurtmalar summasi",
            data: orderTotals.map((item) => Number(item.total)),
          },
        ]}
        options={{
          chart: {
            height: 350,
            type: "line",
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return val.toString();
            },
            offsetY: -20,
            style: {
              fontSize: "10px",
              colors: ["#304758"],
            },
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            categories: orderTotals.map((item) => item.date.slice(8, 10)),
            position: "top",
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
                },
              },
            },
            tooltip: {
              enabled: false,
            },
          },
          yaxis: {
            axisBorder: {
              show: true,
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: false,
            },
          },
          title: {
            text: `Oxirgi ${orderTotals.length} kunlik buyurtmalar summasi statistikasi`,
            floating: false,
            offsetY: 330,
            align: "left",
            style: {
              color: "#444",
            },
          },
        }}
      />
    </div>
  );
}

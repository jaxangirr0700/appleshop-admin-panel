import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { OrderCountType, PostdateType } from "../../types/orderDates";
import { api } from "../../utils/api";
import { message } from "antd";

export const ApexChart = ({
  postDeta,
}: {
  postDeta: PostdateType | undefined;
}) => {
  const [orderCount, setOrderCount] = useState<OrderCountType[]>([]);

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
          "https://nt.softly.uz/api/statistics/daily-order-counts",
          postDeta ? postDeta : datePayload
        )
        .then((res) => {
          setOrderCount(res.data);
        })
        .catch((e) => {
          console.error(e.response?.data || e.message);
          message.error(
            e.response?.data?.message || "Chart bilan xatolik yuz berdi"
          );
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 60000);
    return () => clearInterval(intervalId);
  }, [postDeta]);

  return (
    <div className=" container">
      <ReactApexChart
        type="area"
        height={350}
        series={[
          {
            name: "Buyurtmalar soni",
            data: orderCount.map((item) => Number(item.count)),
          },
        ]}
        options={{
          chart: {
            height: 350,
            type: "area",
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
            background: {
              enabled: false,
              foreColor: "#fff",
              padding: 6,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#304758",
              opacity: 0.9,
            },
            formatter: function (val) {
              return val.toString();
            },
            offsetY: 0,
            style: {
              fontSize: "0px",
              colors: ["#304758"],
            },
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            categories: orderCount.map((item) => item.date.slice(8, 10)),
            labels: {
              rotate: -45,
              style: {
                fontSize: "10px",
              },
            },
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
            text: `Oxirgi ${orderCount.length} kunlik buyurtmalar statistikasi`,
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
};

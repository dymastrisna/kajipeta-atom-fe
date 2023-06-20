import "./demographybycategory.scss";
import React from "react";
import DemographyContainer from "../../container/DemographyContainer";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DotNumber } from "../../../functions/dotnumber";

function DemographyByCategory({
  demographyCategory,
  data,
  KEY_NAME,
  isChartDisp = true,
}) {
  // const data = [
  //     { name: "Group A", value: 400 },
  //     { name: "Group B", value: 300 },
  //     { name: "Group C", value: 300 },
  //     { name: "Group D", value: 200 },
  //     { name: "Group E", value: 100 },
  //   ];
  //   const KEY_NAME = {
  //     anak_f: "Guru",
  //     anak_m: "Polisi",
  //   };
  var total = 0;
  data.forEach((e) => {
    total += parseInt(e.value);
  });
  return (
    <DemographyContainer title={demographyCategory}>
      {isChartDisp && (
        <div style={{ width: "100%", height: "180px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                content={<CustomTooltip KEY_NAME={KEY_NAME}></CustomTooltip>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="bycategoryResult">
        <div className="rowTitle">
          <div className="category">{demographyCategory}</div>
          <div className="percentage">%</div>
          <div className="number">...</div>
        </div>
        {data.map((e, i) => (
          <div className="rowDemography">
            <div className="category">{KEY_NAME[e.name] ?? e.name}</div>
            <div
              className="percentage"
              style={{ backgroundColor: COLORS[i % 5] }}
            >
              {((e.value * 100) / total).toFixed() + " %"}
            </div>
            <div className="number" style={{ backgroundColor: COLORS[i % 5] }}>
              {DotNumber(e.value)}
            </div>
          </div>
        ))}
        <div className="rowTotal">
          <div className="category">Total</div>
          <div className="percentage">100%</div>
          <div className="number">{DotNumber(Math.round(total))}</div>
        </div>
      </div>
    </DemographyContainer>
  );
}
export default DemographyByCategory;

const COLORS = ["#E93D3D", "#9A05A1", "#4DDAE9", "#00A15F", "#ED8600"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={"10px"}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, KEY_NAME }) => {
  if (active && payload && payload.length) {
    console.log(payload);
    return (
      <div className="custom-tooltip">
        <div className="label">{`${KEY_NAME[payload[0].name]} : `}</div>
        <div className="label">{`${DotNumber(payload[0].value)}`}</div>
      </div>
    );
  }
  return null;
};

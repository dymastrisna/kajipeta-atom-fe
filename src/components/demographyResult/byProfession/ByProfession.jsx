import "./byprofession.scss";
import React from "react";
import DemographyContainer from "../../container/DemographyContainer";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { DotNumber } from "../../../functions/dotnumber";

function ByProfession({ professionData }) {
  const data = professionData ?? [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 100 },
  ];
  const KEY_NAME = {
    anak_f: "Guru",
    anak_m: "Polisi",
  };
  var total = 0;
  data.forEach((e) => {
    total += e.value;
  });

  return (
    <DemographyContainer title={"Profession"}>
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
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="professionResult">
        <div className="rowTitle">
          <div className="profession">Profession</div>
          <div className="percentage">%</div>
          <div className="number">Number</div>
        </div>
        {data.map((e, i) => (
          <div className="rowDemography">
            <div className="profession">{KEY_NAME[e.name] ?? e.name}</div>
            <div className="percentage" style={{ backgroundColor: COLORS[i] }}>
              {((e.value * 100) / total).toFixed() + " %"}
            </div>
            <div className="number" style={{ backgroundColor: COLORS[i] }}>
              {DotNumber(e.value)}
            </div>
          </div>
        ))}
        <div className="rowTotal">
          <div className="profession">Total</div>
          <div className="percentage">100%</div>
          <div className="number">{DotNumber(total)}</div>
        </div>
      </div>
    </DemographyContainer>
  );
}

export default ByProfession;

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

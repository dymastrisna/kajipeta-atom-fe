import React from "react";
import Container2 from "./Container2";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function SertifChart({ sertifikat }) {
  const data = [
    {
      name: "Pecah",
      male: Math.round(sertifikat[60]) || ""
    },
    {
      name: "Induk",
      male: Math.round(sertifikat[80]) || ""
    }
  ];
  return (
    <Container2 title={"Status Sertifikat"}>
      <div className="sertifcomp" style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart width={500} height={300} data={data}>
            <CartesianGrid strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="male" fill="#5AC6DD" />
            <Bar dataKey="female" fill="#EF5DA8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container2>
  );
}

export default SertifChart;

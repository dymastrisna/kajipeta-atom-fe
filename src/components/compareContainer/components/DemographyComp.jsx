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

function DemographyComp({ demography }) {
  const data = [
    {
      name: "0-5",
      male: Math.round(demography["balita_m"]) || "",
      female: Math.round(demography["balita_f"]) || "",
    },
    {
      name: "6-15",
      male: Math.round(demography["anak_m"]) || "",
      female: Math.round(demography["anak_f"]) || "",
    },
    {
      name: "16-25",
      male: Math.round(demography["remaja_m"]) || "",
      female: Math.round(demography["remaja_f"]) || "",
    },
    {
      name: "26-45",
      male: Math.round(demography["pro_m"]) || "",
      female: Math.round(demography["pro_f"]) || "",
    },
    {
      name: "46-65",
      male: Math.round(demography["tua_m"]) || "",
      female: Math.round(demography["tua_f"]) || "",
    },
    {
      name: "> 65",
      male: Math.round(demography["pensiun_m"]) || "",
      female: Math.round(demography["pensiun_f"]) || "",
    },
  ];
  return (
    <Container2 title={"Demography"}>
      <div className="demographycomp" style={{ height: "300px" }}>
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

export default DemographyComp;

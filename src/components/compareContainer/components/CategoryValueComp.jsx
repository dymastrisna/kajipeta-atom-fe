import React from "react";
import Container2 from "./Container2";

function CategoryValueComp({ data }) {
  const valueCount = getCategory(data);
  const colors = [
    "rgb(128, 0, 38, 0.6)",
    "rgb(189, 0, 38,0.6)",
    "rgb(252, 78, 42, 0.6)",
    "rgb(254, 178, 76, 0.6)",
    "rgb(255, 237, 160, 0.6)",
  ];
  return (
    <Container2 title={"Value"}>
      <div
        style={{
          height: "150px",
          gap: "5px",
          display: "flex",
          flexDirection: "column",
          marginLeft: "10px",
        }}
      >
        {valueCount.map((_, i) => (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "3px",
                marginTop: "5px",
                backgroundColor: colors[i],
              }}
              key={i}
            ></div>
            <div style={{ fontSize: "13px", fontWeight: "500" }}>
              value {i + 1} :
            </div>
            <div>{valueCount[i].jumlah}</div>
          </div>
        ))}
      </div>
    </Container2>
  );
}

export default CategoryValueComp;

const getCategory = (grid) => {
  let valueCount = [
    { category: "Acceptable 1", jumlah: 0 },
    { category: "Acceptable 2", jumlah: 0 },
    { category: "Acceptable 3", jumlah: 0 },
    { category: "Acceptable 4", jumlah: 0 },
    { category: "Acceptable 5", jumlah: 0 },
  ];
  grid.forEach((griddata) => {
    let value = griddata.value;
    console.log(value);
    switch (true) {
      case value >= 0.8:
        valueCount[0].jumlah++;
        break;
      case value >= 0.6:
        valueCount[1].jumlah++;
        break;
      case value >= 0.4:
        valueCount[2].jumlah++;
        break;
      case value >= 0.2:
        valueCount[3].jumlah++;
        break;
      default:
        valueCount[4].jumlah++;
    }
  });
  return valueCount;
};

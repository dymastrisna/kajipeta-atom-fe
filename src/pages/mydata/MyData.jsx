import React from "react";
import "./mydata.scss";
import { DataGrid } from "@mui/x-data-grid";

function MyData() {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "age", headerName: "Age", width: 90 },
  ];

  const rows = [
    { id: 1, firstName: "John", lastName: "Doe", age: 35 },
    { id: 2, firstName: "Jane", lastName: "Doe", age: 28 },
    { id: 3, firstName: "Bob", lastName: "Smith", age: 42 },
    { id: 4, firstName: "Alice", lastName: "Johnson", age: 21 },
    { id: 5, firstName: "Mike", lastName: "Davis", age: 30 },
  ];

  return (
    <div className="mydata">
      <p className="title">Data Management</p>
      <div className="dataContainer">
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
}

export default MyData;
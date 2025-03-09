import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AGGridTable = ({ rowData }) => {
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    if (rowData.length > 0) {
      // Dynamically create column definitions from the first row's keys
      const columns = Object.keys(rowData[0]).map((key) => ({
        headerName: key.toUpperCase(),
        field: key,
        sortable: true,
        filter: true,
        resizable: true,
      }));
      setColumnDefs(columns);
    }
  }, [rowData]);

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} pagination={true} />
    </div>
  );
};

export default AGGridTable;

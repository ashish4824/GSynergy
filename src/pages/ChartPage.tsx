import React, { useState } from "react";
import * as XLSX from "xlsx";
import AGGridTable from "./AGGridTable";

const ChartPage = () => {
  const [excelData, setExcelData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setExcelData(parsedData);
      };
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <h3>AG-Grid Table</h3>
      {excelData.length > 0 && <AGGridTable rowData={excelData} />}
    </div>
  );
};

export default ChartPage;

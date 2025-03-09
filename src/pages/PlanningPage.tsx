import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setPlanningData, updateSalesUnits } from "../redux/planningSlice";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { CsvExportModule } from "@ag-grid-community/csv-export";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { GridChartsModule } from "@ag-grid-enterprise/charts"; // ✅ Correct replacement

// Register AG Grid modules
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule, RowGroupingModule, GridChartsModule]);

const LOCAL_STORAGE_KEY = "planningData";

const PlanningPage = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus.skus);
  const planningData = useSelector((state: RootState) => state.planning.data);
  const [gridApi, setGridApi] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      dispatch(setPlanningData(JSON.parse(savedData)));
    } else if (planningData.length === 0 && stores.length > 0 && skus.length > 0) {
      const generatedData = stores.flatMap((store) =>
        skus.map((sku) => ({
          id: `${store.id}-${sku.id}`,
          storeName: store.name,
          skuName: sku.name,
          price: sku.price,
          cost: sku.cost,
          salesUnits: 0,
        }))
      );
      dispatch(setPlanningData(generatedData));
    }
  }, [stores, skus, dispatch]);

  useEffect(() => {
    if (updateTimeout.current) clearTimeout(updateTimeout.current);
    updateTimeout.current = setTimeout(() => {
      if (planningData.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(planningData));
      }
    }, 500);
  }, [planningData]);

  const handleCellValueChange = (params: any) => {
    if (params.colDef.field === "salesUnits") {
      if (updateTimeout.current) clearTimeout(updateTimeout.current);
      updateTimeout.current = setTimeout(() => {
        dispatch(updateSalesUnits({ id: params.data.id, salesUnits: params.newValue }));
      }, 300);
    }
  };

  const exportToCSV = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  const columnDefs = [
    { headerName: "Store", field: "storeName", rowGroup: true, hide: true },
    { headerName: "SKU", field: "skuName", sortable: true, filter: true },
    { headerName: "Sales Units", field: "salesUnits", editable: true, filter: "agNumberColumnFilter" },
    {
      headerName: "Sales $",
      field: "salesDollars",
      valueGetter: (params: any) => params.data.salesUnits * params.data.price || 0,
      cellRenderer: (params: any) => `$${(params.value || 0).toFixed(2)}`,
    },
    {
      headerName: "GM $",
      field: "gmDollars",
      valueGetter: (params: any) => (params.data.salesUnits * (params.data.price - params.data.cost)) || 0,
      cellRenderer: (params: any) => `$${(params.value || 0).toFixed(2)}`,
    },
    {
      headerName: "GM %",
      field: "gmPercent",
      valueGetter: (params: any) => {
        const sales = params.data.salesUnits * params.data.price;
        return sales > 0 ? ((params.data.salesUnits * (params.data.price - params.data.cost)) / sales) * 100 : 0;
      },
      cellRenderer: (params: any) => {
        const value = (params.value || 0).toFixed(2) + "%";
        const color =
          params.value >= 40 ? "green" : params.value >= 10 ? "yellow" : params.value >= 5 ? "orange" : "red";
        return `<span style="color: ${color}; font-weight: bold;">${value}</span>`;
      },
    },
  ];

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} p-4`}>
      <h1 className="text-2xl font-bold mb-4">Planning</h1>
      <div className="flex gap-4">
        <button onClick={exportToCSV} className="px-4 py-2 bg-blue-500 text-white rounded">
          Download CSV
        </button>
        <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-gray-700 text-white rounded">
          Toggle Dark Mode
        </button>
      </div>
      <div
        className={`ag-theme-alpine${darkMode ? "-dark" : ""}`}
        style={{ height: 500, width: "100%", marginTop: "10px" }}
      >
        <AgGridReact
          rowData={planningData}
          columnDefs={columnDefs}
          onCellValueChanged={handleCellValueChange}
          defaultColDef={{ flex: 1, resizable: true, sortable: true, filter: true }}
          groupDisplayType="groupRows"
          autoGroupColumnDef={{ headerName: "Store", field: "storeName" }}
          onGridReady={(params) => setGridApi(params.api)}
          pagination={true}
          paginationPageSize={20}
          suppressRowClickSelection={true}
          rowSelection="multiple"
          rowDragManaged={true} // ✅ Drag & Drop Rows (Now Supported)
          enableRangeSelection={true} // ✅ Multi-Cell Selection
        />
      </div>
    </div>
  );
};

export default PlanningPage;

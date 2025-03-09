import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlanningRow {
  id: string;
  storeName: string;
  skuName: string;
  price: number;
  cost: number;
  salesUnits: number;
}

interface PlanningState {
  data: PlanningRow[];
}

const initialState: PlanningState = {
  data: [],
};

const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setPlanningData: (state, action: PayloadAction<PlanningRow[]>) => {
      state.data = action.payload;
    },
    updateSalesUnits: (state, action: PayloadAction<{ id: string; salesUnits: number }>) => {
      const row = state.data.find((r) => r.id === action.payload.id);
      if (row) {
        row.salesUnits = action.payload.salesUnits;
      }
    },
  },
});

export const { setPlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;

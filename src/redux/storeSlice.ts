import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Store {
  id: number;
  name: string;
}

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: [],
};

const storeSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<string>) => {
      state.stores.push({ id: Date.now(), name: action.payload });
    },
    deleteStore: (state, action: PayloadAction<number>) => {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
    updateStore: (state, action: PayloadAction<{ id: number; name: string }>) => {
      const store = state.stores.find((s) => s.id === action.payload.id);
      if (store) store.name = action.payload.name;
    },
  },
});

export const { addStore, deleteStore, updateStore } = storeSlice.actions;
export default storeSlice.reducer;

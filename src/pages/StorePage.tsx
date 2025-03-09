import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addStore, deleteStore, updateStore } from "../redux/storeSlice";

const StorePage = () => {
  const dispatch = useDispatch();
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [storeName, setStoreName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddStore = () => {
    if (storeName.trim() !== "") {
      dispatch(addStore(storeName));
      setStoreName("");
    }
  };

  const handleUpdateStore = () => {
    if (editId !== null && storeName.trim() !== "") {
      dispatch(updateStore({ id: editId, name: storeName }));
      setEditId(null);
      setStoreName("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Store Management</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Enter store name"
        />
        {editId ? (
          <button onClick={handleUpdateStore} className="bg-blue-500 text-white px-4 py-2">
            Update
          </button>
        ) : (
          <button onClick={handleAddStore} className="bg-green-500 text-white px-4 py-2">
            Add
          </button>
        )}
      </div>

      <ul>
        {stores.map((store) => (
          <li key={store.id} className="border p-2 flex justify-between items-center">
            <span>{store.name}</span>
            <div>
              <button
                onClick={() => {
                  setEditId(store.id);
                  setStoreName(store.name);
                }}
                className="bg-yellow-500 text-white px-3 py-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteStore(store.id))}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StorePage;

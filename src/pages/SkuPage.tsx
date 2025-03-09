import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addSKU, deleteSKU, updateSKU } from "../redux/skuSlice";

const SkuPage = () => {
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus.skus);

  const [skuName, setSkuName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [editId, setEditId] = useState<number | null>(null);

  const handleAddSKU = () => {
    if (skuName.trim() !== "" && price > 0 && cost > 0) {
      dispatch(addSKU({ id: Date.now(), name: skuName, price, cost }));
      setSkuName("");
      setPrice(0);
      setCost(0);
    }
  };

  const handleUpdateSKU = () => {
    if (editId !== null && skuName.trim() !== "" && price > 0 && cost > 0) {
      dispatch(updateSKU({ id: editId, name: skuName, price, cost }));
      setEditId(null);
      setSkuName("");
      setPrice(0);
      setCost(0);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">SKU Management</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={skuName}
          onChange={(e) => setSkuName(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Enter SKU name"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 w-24"
          placeholder="Price"
        />
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          className="border p-2 w-24"
          placeholder="Cost"
        />
        {editId ? (
          <button onClick={handleUpdateSKU} className="bg-blue-500 text-white px-4 py-2">
            Update
          </button>
        ) : (
          <button onClick={handleAddSKU} className="bg-green-500 text-white px-4 py-2">
            Add
          </button>
        )}
      </div>

      <ul>
        {skus.map((sku) => (
          <li key={sku.id} className="border p-2 flex justify-between items-center">
            <span>{sku.name} - ${sku.price} | Cost: ${sku.cost}</span>
            <div>
              <button
                onClick={() => {
                  setEditId(sku.id);
                  setSkuName(sku.name);
                  setPrice(sku.price);
                  setCost(sku.cost);
                }}
                className="bg-yellow-500 text-white px-3 py-1 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteSKU(sku.id))}
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

export default SkuPage;

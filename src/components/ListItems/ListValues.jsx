import { toast } from "react-hot-toast";

const ListValues = ({ item, titleId, render = false, setSelectedData }) => {
  const handleSelectedItem = (item) => {
    setSelectedData(item);
    toast.success(item.type + " selected")
  };
  return (
    <details className="pb-4">
      <summary className="cursor-pointer font-semibold text-base bg-slate-100 p-2 rounded-md capitalize mb-2">
        {item.value}
      </summary>
      <ul className="space-y-2">
        {item.data.map((elem, id) => {
          return (
            <li
              key={elem + id}
              className="text-sm text-neutral-600 bg-slate-50 p-2 rounded-md capitalize md:ml-4 ml-2 relative">
              {elem}
              {render && (
                <p onClick={() => handleSelectedItem({ titleId: titleId, valueId: id, type: item.dataType})} className="absolute top-1/2 -translate-y-1/2 right-1 hover:bg-slate-200 transition-colors px-3 font-semibold lowercase rounded-md py-1 text-xs cursor-pointer bg-slate-50">select item</p>
              )}
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default ListValues;

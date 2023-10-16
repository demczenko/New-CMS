import React from "react";

const ListValues = ({ item }) => {
  return (
    <details className="pb-4">
      <summary className="cursor-pointer font-semibold text-base bg-slate-100 p-2 rounded-md capitalize mb-2">
        Data for {item.value}
      </summary>
      <div className="space-y-2">
        {item.data.map((item, id) => {
          return (
            <li
              key={item + id}
              className="font-semibold text-base bg-slate-100 p-2 rounded-md capitalize md:ml-4 ml-2">
              {item}
            </li>
          );
        })}
      </div>
    </details>
  );
};

export default ListValues;

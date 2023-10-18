import React from "react";
import { useTitle, useValue } from "../../hooks";

const ListTabs = ({ item }) => {
  const [values, setValues] = useValue();
  const [titles, setTitles] = useTitle();
  return (
    <details className="pb-4">
      <summary className="cursor-pointer font-semibold text-base bg-slate-100 p-2 rounded-md capitalize mb-2">
        Data for {item.value}
      </summary>
      <ul className="space-y-2">
        {item.data.map((elem) => {
          const title = titles.find((title) => title.id === elem.titleId);
          const value = values.find((value) => value.id === elem.valueId);
          return (
            <li
              key={elem.id}
              className="font-semibold text-base bg-slate-100 p-2 rounded-md capitalize md:ml-4 ml-2">
              {title.value}
              {value.data.map((item, id) => (
                <p key={id} className="text-sm text-neutral-600 font-normal">
                  {item}
                </p>
              ))}
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default ListTabs;

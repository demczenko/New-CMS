import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import React, { useEffect } from "react";
import { useTab } from "../hooks/useTab";
import { useValue } from "../hooks/useValue";

const TemplateRouterGuard = ({ children }) => {
  const [titles, setTItle] = useTitle();
  const [tabs, setTabs] = useTab();
  const [values, setValues] = useValue();
  const navigate = useNavigate();

  const isEveryTitleHasBeenAddedToEveryTab = () => {
    let result = titles
      .map((tab) => tab.isSelectedOnEveryTab)
      .every((item) => item === true);
    return result;
  };

  const isEveryTabWithTheSameTitleIdHasTheSameValueLength = (titleId) => {
    const filterValueIds = [];
    for (let tab of tabs) {
      const result = tab.data.find((item) => item.titleId === titleId);
      if (result !== undefined) {
        filterValueIds.push(result.valueId);
      }
    }

    const filterValues = [];
    for (let id of filterValueIds) {
      for (let obj of values) {
        if (obj.id === id) {
          filterValues.push(obj);
        }
      }
    }
    const filterValuesLength = filterValues.map((item) => item.value.length);
    const firstItem = filterValuesLength[0]
    return filterValuesLength.every(item => item === firstItem)
  };

  useEffect(() => {
    if (!titles.length) {
      navigate("/data");
    }

    let result;
    titles.forEach(tab => {
      result = isEveryTabWithTheSameTitleIdHasTheSameValueLength(tab.id)
    })
    if (!result) {
      navigate("/data");
    }
    
    if (titles.lengt >= 1) {
      if (!isEveryTitleHasBeenAddedToEveryTab()) {
        navigate("/data");
      }
    }
  }, []);
  return <>{children}</>;
};

export default TemplateRouterGuard;

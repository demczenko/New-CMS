import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import React, { useEffect } from "react";
import { useTab } from "../hooks/useTab";
import { useValue } from "../hooks/useValue";
import { useFooter, useHeader } from "../hooks";
import { toast } from "react-hot-toast";

const TemplateRouterGuard = ({ children }) => {
  const [titles, setTItle] = useTitle();
  const [tabs, setTabs] = useTab();
  const [values, setValues] = useValue();

  const [headers, setHeader] = useHeader();
  const [footers, setFooter] = useFooter();

  const navigate = useNavigate();

  const isEveryFooterAndHeaderSelected = () => {
    const isEveryFootersSelected = headers.map((item) => item.isSelected).every((item) => item === true);
    const isEveryHeaderSelected = footers.map((item) => item.isSelected).every((item) => item === true);

    if (isEveryFootersSelected && isEveryHeaderSelected) {
      return true
    } else {
      return false
    }
  }

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
      toast.error("No titles found.")
    }

    if (!isEveryFooterAndHeaderSelected()) {
      navigate("/template");
      toast.error("Not every footer and header has been selected.")
    }

    let result;
    titles.forEach(tab => {
      result = isEveryTabWithTheSameTitleIdHasTheSameValueLength(tab.id)
    })
    if (!result) {
      navigate("/data");
      toast.error("Not every tab with the same title id has the same value length.")
    }
    
    if (titles.lengt >= 1) {
      if (!isEveryTitleHasBeenAddedToEveryTab()) {
        navigate("/data");
        toast.error("Add every title to tab.")
      }
    }
  }, []);
  return <>{children}</>;
};

export default TemplateRouterGuard;

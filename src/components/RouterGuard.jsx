import { useLocation, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import React, { useEffect } from "react";
import { useTab } from "../hooks/useTab";
import { useValue } from "../hooks/useValue";
import { useFooter, useHeader, useMain } from "../hooks";
import { toast } from "react-hot-toast";

const TemplateRouterGuard = ({ children }) => {
  const [titles, setTItle] = useTitle();
  const [tabs, setTabs] = useTab();
  const [values, setValues] = useValue();
  const { pathname } = useLocation();

  const [headers, setHeader] = useHeader();
  const [footers, setFooter] = useFooter();
  const [main, setMain] = useMain();

  const navigate = useNavigate();

  const isEveryFooterAndHeaderSelected = () => {
    const isEveryFootersSelected = headers
      .map((item) => item.isSelected)
      .every((item) => item === true);
    const isEveryHeaderSelected = footers
      .map((item) => item.isSelected)
      .every((item) => item === true);

    if (isEveryFootersSelected && isEveryHeaderSelected) {
      return true;
    } else {
      return false;
    }
  };

  const isEveryTitleHasBeenAddedToEveryTab = () => {
    let result = titles
      .map((tab) => tab.isSelectedOnEveryTab)
      .every((item) => item === true);
    return result;
  };

  const isEveryTabHasTheSameDataLength = () => {
    let titlesId = [];
    for (let tab of tabs) {
      const titleIds = tab.data.map((tab) => tab.titleId)
      titlesId.push(titleIds);
    }

    const length = titlesId.map(item => item.length)
    const first = length[0]
    return length.every(item => item === first)
  }


  const isEveryTabWithTheSameTitleIdHasTheSameValueLength = () => {
    let titlesAndValuesId = [];
    for (let tab of tabs) {
      titlesAndValuesId.push(...tab.data.map((tab) => tab));
    }

    const tabsValuesLength = []
    for (const title of titles) {

      const valuesLength = []
      for (const {titleId, valueId} of titlesAndValuesId) {
        if (title.id === titleId) {
          valuesLength.push(values.find(value => value.id === valueId).data.length)
        }
      }
      const first = valuesLength[0]
      tabsValuesLength.push(valuesLength.every(value => value === first))
    }

    return tabsValuesLength.every(value => value === true)
  };

  const isEveryValueSelected = () => {
    const valuesSelected = values.map((item) => item.isSelected);
    return valuesSelected.every((isSelected) => isSelected === true);
  };
  useEffect(() => {
    if (!titles.length) {
      toast.error("No titles found.");
      return navigate("/cms/data");
    }

    if (!isEveryValueSelected()) {
      toast.error("Every value should be selected.");
      return navigate("/cms/data");
    }
    
    if (!isEveryTabHasTheSameDataLength()) {
      toast.error("Every tab should have the same amount of selected values.");
      return navigate("/cms/data");
    }

    if (!isEveryTabWithTheSameTitleIdHasTheSameValueLength()) {
      toast.error("Every tab should have the same value length.");
      return navigate("/cms/data");
    }

    if (titles.length >= 2) {
      if (!isEveryTitleHasBeenAddedToEveryTab()) {
        toast.error("Add every title to tab.");
        return navigate("/cms/data");
      }
    }

    if (!isEveryFooterAndHeaderSelected()) {
      toast.error("Not every footer and header has been selected.");
      return navigate("/cms/template");
    }

    if (pathname === "/cms/render") {
      if (!main.length) {
        toast.error("No templates found.");
        return navigate("/cms/template");
      }
    }
  }, [pathname]);

  return <>{children}</>;
};

export default TemplateRouterGuard;

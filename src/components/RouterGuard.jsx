import { useNavigate } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import React, { useEffect } from "react";

const TemplateRouterGuard = ({ children }) => {
  const [titles, setTItle] = useTitle();
  const navigate = useNavigate();

  const isEveryTitleHasBeenAddedToEveryTab = () => {
    let result = titles
      .map((tab) => tab.isSelectedOnEveryTab)
      .every((item) => item === true);
    return result;
  };

  useEffect(() => {
    if (!titles.length) {
      navigate("/data");
    }
    if (!isEveryTitleHasBeenAddedToEveryTab()) {
      navigate("/data");
    }
  }, []);
  return <>{children}</>;
};

export default TemplateRouterGuard;

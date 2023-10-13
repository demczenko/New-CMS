import React, { createContext, useContext, useState } from "react";

const RenderAreaContext = createContext();

export const useRenderArea = () => {
  const context = useContext(RenderAreaContext);

  if (!context) {
    throw new Error("Context cannot be used without provider.");
  }

  return context;
};

const RenderArea = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <RenderAreaContext.Provider value={[selectedTab, setSelectedTab]}>
      {children}
    </RenderAreaContext.Provider>
  );
};

export default RenderArea;

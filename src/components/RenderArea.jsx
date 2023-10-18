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
  const [selectedTabAndMainId, setselectedTabAndMainId] = useState("");
  const [isOpen, setIsOpen] = useState("");
  const [targets, setNewTarget] = useState([]);

  return (
    <RenderAreaContext.Provider
      value={{
        values: {
          selectedTabAndMainId,
          isOpen,
          targets
        },
        functions: {
          setselectedTabAndMainId,
          setIsOpen,
          setNewTarget
        },
      }}>
      {children}
    </RenderAreaContext.Provider>
  );
};

export default RenderArea;

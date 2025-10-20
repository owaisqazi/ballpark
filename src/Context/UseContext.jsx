// DataContext.js
import React, { createContext, useState } from 'react';

const DataContext = createContext();

export const ContextDataProvider = ({ children }) => {
  const [itemContext, setItemContext] = useState({});
  const toggleContextdata = (e) => {
    setItemContext(e);
  };
  return (
    <DataContext.Provider value={{ itemContext, toggleContextdata }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

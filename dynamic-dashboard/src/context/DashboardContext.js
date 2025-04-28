import React, { createContext, useContext, useState } from 'react';
import widgetsData from '../data/widgetsData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [categories, setCategories] = useState(widgetsData);

  const addWidget = (categoryId, widget) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: [...cat.widgets, widget] }
          : cat
      )
    );
  };

  const removeWidget = (categoryId, widgetId) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? { ...cat, widgets: cat.widgets.filter(w => w.id !== widgetId) }
          : cat
      )
    );
  };

  return (
    <DashboardContext.Provider value={{ categories, addWidget, removeWidget }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);

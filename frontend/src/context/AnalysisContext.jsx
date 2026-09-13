import React, { createContext, useState } from 'react';

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [predictionResults, setPredictionResults] = useState(null);

  return (
    <AnalysisContext.Provider value={{ currentAnalysis, setCurrentAnalysis, predictionResults, setPredictionResults }}>
      {children}
    </AnalysisContext.Provider>
  );
};
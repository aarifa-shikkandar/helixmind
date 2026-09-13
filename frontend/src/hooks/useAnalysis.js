import { useContext } from 'react';
import { AnalysisContext } from '../context/AnalysisContext';

export const useAnalysis = () => useContext(AnalysisContext);
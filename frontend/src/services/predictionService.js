import API from './api';

export const predictionService = {
  runPrediction: async (analysisId) => {
    const response = await API.post(`/prediction/run/${analysisId}`);
    return response.data;
  },
  getPredictionHistory: async () => {
    const response = await API.get('/prediction/history');
    return response.data;
  },
};
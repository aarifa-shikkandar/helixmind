import API from './api';

export const dnaService = {
  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await API.post('/dna/upload-file', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
  analyzeRawSequence: async (patientId, rawSequence) => {
    const response = await API.post('/dna/analyze-sequence', {
      patient_id: patientId,
      raw_sequence: rawSequence,
    });
    return response.data;
  },
};
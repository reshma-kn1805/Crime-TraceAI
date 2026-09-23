/**
 * CrimeTraceAI — AI & Machine Learning Prediction Service
 */

import { predictCategory, predictRiskAndPriority } from '../utils/mlPredictor';
import { api } from './api';

export const predictionService = {
  // Supervised Category Classification Model
  predictCategory: async (features) => {
    // Attempt backend ML endpoint if available
    const backendResult = await api.post('/predict/category', features);
    if (backendResult && backendResult.predictedCategory) {
      return backendResult;
    }

    // High-performance client-side ML engine
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = predictCategory(features);
        resolve(result);
      }, 450); // realistic inference delay
    });
  },

  // Case Risk & Priority Model
  predictRisk: async (features) => {
    const backendResult = await api.post('/predict/risk', features);
    if (backendResult && backendResult.riskLevel) {
      return backendResult;
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        const result = predictRiskAndPriority(features);
        resolve(result);
      }, 350);
    });
  }
};

import { apiClient } from '@/lib/api-client';

export const quotesService = {
  createQuote: async (amount: number, fromCurrency: string, toCurrency: string) => {
    const response = await apiClient.post('/quote', { amount, fromCurrency, toCurrency });
    return response.data;
  },
  getQuote: async (id: string) => {
    const response = await apiClient.get(`/quote/${id}`);
    return response.data;
  },
};

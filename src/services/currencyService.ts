import api from "./api";

export interface CurrencyConversionResponse {
  originalAmount: number;
  originalCurrency: string;
  convertedAmount: number;
  targetCurrency: string;
  exchangeRate: number;
  message: string;
}

export interface ApiError {
  success: false;
  message: string;
  error?: string;
}

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
}

class CurrencyService {
  /**
   * Convierte soles a dólares
   */
  async convertSolesToDollars(
    amount: number
  ): Promise<CurrencyConversionResponse> {
    try {
      const response = await api.get<CurrencyConversionResponse>(
        "/api/currency/convert",
        {
          params: {
            amount: amount,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        throw new Error(
          axiosError.response.data.message || "Currency conversion failed"
        );
      }
      throw new Error("Network error occurred during conversion");
    }
  }

  /**
   * Obtiene el tipo de cambio actual de soles a dólares
   */
  async getExchangeRate(): Promise<number> {
    try {
      // Usamos una cantidad de 1 para obtener el tipo de cambio
      const response = await api.get<CurrencyConversionResponse>(
        "/api/currency/convert",
        {
          params: {
            amount: 1,
          },
        }
      );
      return response.data.exchangeRate;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        throw new Error(
          axiosError.response.data.message || "Failed to get exchange rate"
        );
      }
      throw new Error("Network error occurred while getting exchange rate");
    }
  }
}

export default new CurrencyService();

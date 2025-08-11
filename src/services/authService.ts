import api from "./api";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  enabled: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
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

class AuthService {
  /**
   * Inicia sesión del usuario
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(
        "/api/auth/login",
        credentials
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.data) {
        throw new Error(axiosError.response.data.message || "Login failed");
      }
      throw new Error("Network error occurred");
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout(): Promise<void> {
    try {
      await api.post("/api/session/logout");
    } catch {
      // Incluso si hay error en el logout, limpiamos el estado local
      console.warn("Logout API call failed, but clearing local state");
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  async checkAuth(): Promise<boolean> {
    try {
      await api.get("/api/session/validate");
      return true;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return false;
      }
      // Para otros errores (como 500, 404, etc.), asumimos que no está autenticado
      return false;
    }
  }

  /**
   * Obtiene información del usuario actual
   */
  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await api.get<User>("/api/session/user");
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        return null;
      }
      throw error;
    }
  }
}

export default new AuthService();

import axios from "axios";

// Configuración base de axios
const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // Importante: envía cookies con cada request
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar lógica adicional antes de cada request
    // Por ejemplo, agregar headers de autorización si es necesario
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores global
    if (error.response?.status === 401) {
      // Usuario no autenticado - redirigir al login
      console.log("Unauthorized access - redirecting to login");
    }
    return Promise.reject(error);
  }
);

export default api;

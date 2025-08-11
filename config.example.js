// Configuration Example
// Copy this file to config.js and update the values as needed

export const config = {
  // API Configuration
  apiUrl: 'http://localhost:3000',
  apiTimeout: 5000,

  // Feature Flags
  enableAnalytics: false,
  enableDebugMode: false,

  // App Configuration
  appName: 'React TypeScript App',
  appVersion: '1.0.0',

  // Development Settings
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} 
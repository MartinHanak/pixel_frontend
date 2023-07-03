const devMode = process.env.REACT_APP_DEVMODE;

export const BACKEND_URL = devMode ? "http://localhost:3002" : "https://www.quizzillionaire.com";
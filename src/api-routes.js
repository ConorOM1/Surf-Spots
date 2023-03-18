import { userApi } from "./api/user-api.js";
import { difficultyApi } from "./api/difficulty-api.js";
import { spotApi } from "./api/spot-api.js";
import { analyticsApi } from "./api/analytics-api.js";


export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/difficulties", config: difficultyApi.create },
  { method: "DELETE", path: "/api/difficulties", config: difficultyApi.deleteAll },
  { method: "GET", path: "/api/difficulties", config: difficultyApi.find },
  { method: "GET", path: "/api/difficulties/{id}", config: difficultyApi.findOne },
  { method: "DELETE", path: "/api/difficulties/{id}", config: difficultyApi.deleteOne },

  { method: "GET", path: "/api/spots", config: spotApi.find },
  { method: "GET", path: "/api/spots/{id}", config: spotApi.findOne },
  { method: "POST", path: "/api/difficulties/{id}/spots", config: spotApi.create },
  { method: "DELETE", path: "/api/spots", config: spotApi.deleteAll },
  { method: "DELETE", path: "/api/spots/{id}", config: spotApi.deleteOne },
  { method: "GET", path: "/api/analytics", config: analyticsApi.calculate }

];

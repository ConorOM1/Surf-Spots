import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { difficultyController } from "./controllers/difficulty-controller.js";
import { spotController } from "./controllers/spot-controller.js";
import { adminController } from "./controllers/admin-controller.js";


export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },
  { method: "GET", path: "/admin", config: adminController.index },
  { method: "GET", path: "/admin/deleteuser/{id}", config: adminController.deleteUser },
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/adddifficulty", config: dashboardController.addDifficulty },
  { method: "GET", path: "/dashboard/deletedifficulty/{id}", config: dashboardController.deleteDifficulty },

  { method: "GET", path: "/difficulty/{id}", config: difficultyController.index },
  { method: "POST", path: "/difficulty/{id}/addspot", config: difficultyController.addSpot },
  { method: "GET", path: "/difficulty/{id}/deletespot/{spotid}", config: difficultyController.deleteSpot },

  { method: "GET", path: "/spot/{id}/editspot/{spotid}", config: spotController.index },
  { method: "POST", path: "/spot/{id}/updatespot/{spotid}", config: spotController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];

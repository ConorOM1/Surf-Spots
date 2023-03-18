import { DifficultySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const difficulties = await db.difficultyStore.getUserDifficulties(loggedInUser._id);
      const viewData = {
        title: "Surf Spots Dashboard",
        user: loggedInUser,
        difficulties: difficulties,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addDifficulty: {
    validate: {
      payload: DifficultySpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Difficulty error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newDifficulty = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.difficultyStore.addDifficulty(newDifficulty);
      return h.redirect("/dashboard");
    },
  },

  deleteDifficulty: {
    handler: async function (request, h) {
      const difficulty = await db.difficultyStore.getDifficultyById(request.params.id);
      await db.difficultyStore.deleteDifficultyById(difficulty._id);
      return h.redirect("/dashboard");
    },
  },
};

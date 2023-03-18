import { SpotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const difficultyController = {
  index: {
    handler: async function (request, h) {
      const difficulty = await db.difficultyStore.getDifficultyById(request.params.id);
      const viewData = {
        title: "Difficulty",
        difficulty: difficulty,
      };
      return h.view("difficulty-view", viewData);
    },
  },

  addSpot: {
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("difficulty-view", { title: "Add spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const difficulty = await db.difficultyStore.getDifficultyById(request.params.id);
      const newSpot = {
        name: request.payload.name,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        description: request.payload.description,
      };
      await db.spotStore.addSpot(difficulty._id, newSpot);
      return h.redirect(`/difficulty/${difficulty._id}`);
    },
  },

  deleteSpot: {
    handler: async function (request, h) {
      const difficulty = await db.difficultyStore.getDifficultyById(request.params.id);
      await db.spotStore.deleteSpot(request.params.spotid);
      return h.redirect(`/difficulty/${difficulty._id}`);
    },
  },
};

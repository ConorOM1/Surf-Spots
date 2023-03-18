import { SpotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const spotController = {
  index: {
    handler: async function (request, h) {
      const difficulty = await db.difficultyStore.getDifficultyById(request.params.id);
      const spot = await db.spotStore.getSpotById(request.params.spotid);
      const viewData = {
        title: "Edit Spot",
        difficulty: difficulty,
        spot: spot,
      };
      return h.view("spot-view", viewData);
    },
  },

  update: {
    validate: {
      payload: SpotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("spot-view", { title: "Edit spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.spotid);
      const newSpot = {
        name: request.payload.name,
        latitude: request.payload.latitude,
        longitude: request.payload.longitude,
        description: request.payload.description,
      };
      await db.spotStore.updateSpot(spot, newSpot);
      return h.redirect(`/difficulty/${request.params.id}`);
    },
  },
};

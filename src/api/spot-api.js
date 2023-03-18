import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, SpotSpec, SpotSpecPlus, SpotArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const spotApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spots = await db.spotStore.getAllSpots();
        return spots;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: SpotArraySpec, failAction: validationError },
    description: "Get all spotApi",
    notes: "Returns all spotApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No spot with this id");
        }
        return spot;
      } catch (err) {
        return Boom.serverUnavailable("No spot with this id");
      }
    },
    tags: ["api"],
    description: "Find a Spot",
    notes: "Returns a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: SpotSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.addSpot(request.params.id, request.payload);
        if (spot) {
          return h.response(spot).code(201);
        }
        return Boom.badImplementation("error creating spot");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a spot",
    notes: "Returns the newly created spot",
    validate: { payload: SpotSpec },
    response: { schema: SpotSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.spotStore.deleteAllSpots();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all spotApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No Spot with this id");
        }
        await db.spotStore.deleteSpot(spot._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Spot with this id");
      }
    },
    tags: ["api"],
    description: "Delete a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};

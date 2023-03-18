import Boom from "@hapi/boom";
import { IdSpec, DifficultyArraySpec, DifficultySpec, DifficultySpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const difficultyApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const difficulties = await db.difficultyStore.getAllDifficulties();
        return difficulties;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: DifficultyArraySpec, failAction: validationError },
    description: "Get all difficulties",
    notes: "Returns all difficulties",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const difficulty = await db.difficultyStore.getDifficultyById(request.params.id);
        if (!difficulty) {
          return Boom.notFound("No Difficulty with this id");
        }
        return difficulty;
      } catch (err) {
        return Boom.serverUnavailable("No Difficulty with this id");
      }
    },
    tags: ["api"],
    description: "Find a Difficulty",
    notes: "Returns a difficulty",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: DifficultySpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const difficulty = request.payload;
        const newDifficulty = await db.difficultyStore.addDifficulty(difficulty);
        if (newDifficulty) {
          return h.response(newDifficulty).code(201);
        }
        return Boom.badImplementation("error creating difficulty");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a Difficulty",
    notes: "Returns the newly created difficulty",
    validate: { payload: DifficultySpec, failAction: validationError },
    response: { schema: DifficultySpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const difficulty = await db.difficultyStore.getDifficultyById(request.params.id);
        if (!difficulty) {
          return Boom.notFound("No Difficulty with this id");
        }
        await db.difficultyStore.deletePlaylistById(difficulty._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Difficulty with this id");
      }
    },
    tags: ["api"],
    description: "Delete a difficulty",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.difficultyStore.deleteAllDifficulties();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all DifficultyApi",
  },
};

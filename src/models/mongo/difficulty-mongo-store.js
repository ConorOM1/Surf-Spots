import { Difficulty } from "./difficulty.js";
import { spotMongoStore } from "./spot-mongo-store.js";

export const difficultyMongoStore = {
  async getAllDifficulties() {
    const difficulties = await Difficulty.find().lean();
    return difficulties;
  },

  async getDifficultyById(id) {
    if (id) {
      const difficulty = await Difficulty.findOne({ _id: id }).lean();
      if (difficulty) {
        difficulty.spots = await spotMongoStore.getSpotsByDifficultyId(difficulty._id);
      }
      return difficulty;
    }
    return null;
  },

  async addDifficulty(difficulty) {
    const newDifficulty = new Difficulty(difficulty);
    const difficultyObj = await newDifficulty.save();
    return this.getDifficultyById(difficultyObj._id);
  },

  async getUserDifficulties(id) {
    const difficulty = await Difficulty.find({ userid: id }).lean();
    return difficulty;
  },

  async deleteDifficultyById(id) {
    try {
      await Difficulty.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllDifficulties() {
    await Difficulty.deleteMany({});
  }
};

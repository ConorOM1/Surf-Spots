import { v4 } from "uuid";
import { spotMemStore } from "./spot-mem-store.js";

let difficulties = [];

export const difficultyMemStore = {
  async getAllDifficulties() {
    return difficulties;
  },

  async addDifficulty(difficulty) {
    difficulty._id = v4();
    difficulties.push(difficulty);
    return difficulty;
  },

  async getDifficultyById(id) {
    const list = difficulties.find((difficulty) => difficulty._id === id);
    if (list) {
      list.spots = await spotMemStore.getSpotsByDifficultyId(list._id);
      return list;
    }
    return null;
  },

  async getUserDifficulties(userid) {
    return difficulties.filter((difficulty) => difficulty.userid === userid);
  },

  async deleteDifficultyById(id) {
    const index = difficulties.findIndex((difficulty) => difficulty._id === id);
    if (index !== -1) difficulties.splice(index, 1);
  },

  async deleteAllDifficulties() {
    difficulties = [];
  },
};

import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { spotJsonStore } from "./spot-json-store.js";

const db = new Low(new JSONFile("./src/models/json/difficulties.json"));
db.data = { difficulties: [] };

export const difficultyJsonStore = {
  async getAllDifficulties() {
    await db.read();
    return db.data.difficulties;
  },

  async addDifficulty(difficulty) {
    await db.read();
    difficulty._id = v4();
    db.data.difficulties.push(difficulty);
    await db.write();
    return difficulty;
  },

  async getDifficultyById(id) {
    await db.read();
    let list = db.data.difficulties.find((difficulty) => difficulty._id === id);
    if (list) {
      list.spots = await spotJsonStore.getSpotsByDifficultyId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserDifficulties(userid) {
    await db.read();
    return db.data.difficulties.filter((difficulty) => difficulty.userid === userid);
  },

  async deleteDifficultyById(id) {
    await db.read();
    const index = db.data.difficulties.findIndex((difficulty) => difficulty._id === id);
    if (index !== -1) db.data.difficulties.splice(index, 1);
    await db.write();
  },

  async deleteAllDifficulties() {
    db.data.difficulties = [];
    await db.write();
  },
};

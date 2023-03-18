import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/spots.json"));
db.data = { spots: [] };

export const spotJsonStore = {
  async getAllSpots() {
    await db.read();
    return db.data.spots;
  },

  async addSpot(difficultyId, spot) {
    await db.read();
    spot._id = v4();
    spot.difficultyid = difficultyId;
    db.data.spots.push(spot);
    await db.write();
    return spot;
  },

  async getSpotsByDifficultyId(id) {
    await db.read();
    return db.data.spots.filter((spot) => spot.difficultyid === id);
  },

  async getSpotById(id) {
    await db.read();
    return db.data.spots.find((spot) => spot._id === id);
  },

  async deleteSpot(id) {
    await db.read();
    const index = db.data.spots.findIndex((spot) => spot._id === id);
    db.data.spots.splice(index, 1);
    await db.write();
  },

  async deleteAllSpots() {
    db.data.spots = [];
    await db.write();
  },

  async updateSpot(spot, updatedSpot) {
    spot.name = updatedSpot.name;
    spot.latitude = updatedSpot.latitude;
    spot.longitude = updatedSpot.longitude;
    spot.description = updatedSpot.description;
    await db.write();
  },
};

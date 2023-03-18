import { v4 } from "uuid";

let spots = [];

export const spotMemStore = {
  async getAllSpots() {
    return spots;
  },

  async addSpot(difficultyId, spot) {
    spot._id = v4();
    spot.difficultyid = difficultyId;
    spots.push(spot);
    return spot;
  },

  async getSpotsByDifficultyId(id) {
    return spots.filter((spot) => spot.difficultyid === id);
  },

  async getSpotById(id) {
    let spot = spots.find((spot) => spot._id === id);
    if (spot == undefined) {
      spot = null;
    }
    return spot;
  },

  async getDifficultySpots(difficultyId) {
    return spots.filter((spot) => spot.difficultyid === difficultyId);
  },

  async deleteSpot(id) {
    const index = spots.findIndex((spot) => spot._id === id);
    if (index !== -1) spots.splice(index, 1);
  },

  async deleteAllSpots() {
    spots = [];
  },

  async updateSpot(spot, updatedSpot) {
    spot.name = updatedSpot.name;
    spot.latitude = updatedSpot.latitude;
    spot.longitude = updatedSpot.longitude;
    spot.description = updatedSpot.description;
  },
};

import { Spot } from "./spot.js";
import { difficultyMongoStore } from "./difficulty-mongo-store.js";

export const spotMongoStore = {
  async getAllSpots() {
    const spots = await Spot.find().lean();
    return spots;
  },

  async addSpot(difficultyId, spot) {
    spot.difficultyid = difficultyId;
    const newSpot = new Spot(spot);
    const spotObj = await newSpot.save();
    return this.getSpotById(spotObj._id);
  },

  async getSpotsByDifficultyId(id) {
    const spots = await Spot.find({ difficultyid: id }).lean();
    return spots;
  },

  async getSpotById(id) {
    if (id) {
      const spot = await Spot.findOne({ _id: id }).lean();
      return spot;
    }
    return null;
  },

  async deleteSpot(id) {
    try {
      await Spot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSpots() {
    await Spot.deleteMany({});
  },

  async updateSpot(spot, updatedSpot) {
    const spotDoc = await Spot.findOne({ _id: spot._id });
    spotDoc.name = updatedSpot.name;
    spotDoc.latitude = updatedSpot.latitide;
    spotDoc.longitude = updatedSpot.longitude;
    spotDoc.description = updatedSpot.description;
    await spotDoc.save();
  },
};

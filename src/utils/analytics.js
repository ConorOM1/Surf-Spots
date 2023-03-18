import { db } from "../models/db.js";

export const analytics = {
  async calculateAnalytics() {
    const avgUserDifficulties = await analytics.avgUserDifficulties();
    const avgUserSpots = await analytics.avgUserSpots();
    const avgSpotsPerDifficulty = await analytics.avgSpotsPerDifficulty();
    

    return { avgUserDifficulties, avgUserSpots, avgSpotsPerDifficulty };
  },

  async avgUserDifficulties() {
    const users = await db.userStore.getAllUsers();
    const difficulties = await db.difficultyStore.getAllDifficulties();
    return parseFloat(difficulties.length / users.length).toFixed(2);
  },

  async avgUserSpots() {
    const users = await db.userStore.getAllUsers();
    const spots = await db.spotStore.getAllSpots();
    return parseFloat(spots.length / users.length).toFixed(2);
  },

  async avgSpotsPerDifficulty() {
    const spots = await db.spotStore.getAllSpots();
    const difficulties = await db.difficultyStore.getAllDifficulties();
    return parseFloat(spots.length / difficulties.length).toFixed(2);
  },
};
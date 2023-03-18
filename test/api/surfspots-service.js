import axios from "axios";
import { maggie, serviceUrl } from "../fixtures.js";

export const surfspotsService = {
  surfspotsUrl: serviceUrl,

  async createUser(user) {
    const res = await axios.post(`${this.surfspotsUrl}/api/users`, user);
    return res.data;
  },

  async getUser(id) {
    const res = await axios.get(`${this.surfspotsUrl}/api/users/${id}`);
    return res.data;
  },

  async getAllUsers() {
    try {
      const res = await axios.get(`${this.surfspotsUrl}/api/users`);
      return res.data;
    } catch (e) {
      return null;
    }
  },

  async deleteAllUsers() {
    const res = await axios.delete(`${this.surfspotsUrl}/api/users`);
    return res.data;
  },

  async createDifficulty(difficulty) {
    const res = await axios.post(`${this.surfspotsUrl}/api/difficulties`, difficulty);
    return res.data;
  },

  async deleteAllDifficulties() {
    const response = await axios.delete(`${this.surfspotsUrl}/api/difficulties`);
    return response.data;
  },

  async deleteDifficulty(id) {
    const response = await axios.delete(`${this.surfspotsUrl}/api/difficulties/${id}`);
    return response;
  },

  async getAllDifficulties() {
    const res = await axios.get(`${this.surfspotsUrl}/api/difficulties`);
    return res.data;
  },

  async getDifficulty(id) {
    const res = await axios.get(`${this.surfspotsUrl}/api/difficulties/${id}`);
    return res.data;
  },

  async getAllSpots() {
    const res = await axios.get(`${this.surfspotsUrl}/api/spots`);
    return res.data;
  },

  async createSpot(id, spot) {
    const res = await axios.post(`${this.surfspotsUrl}/api/difficulties/${id}/spots`, spot);
    return res.data;
  },

  async deleteAllSpots() {
    const res = await axios.delete(`${this.surfspotsUrl}/api/spots`);
    return res.data;
  },

  async getSpot(id) {
    const res = await axios.get(`${this.surfspotsUrl}/api/spots/${id}`);
    return res.data;
  },

  async deleteSpot(id) {
    const res = await axios.delete(`${this.surfspotsUrl}/api/spots/${id}`);
    return res.data;
  },

  async authenticate(user) {
    const response = await axios.post(`${this.surfspotsUrl}/api/users/authenticate`, user);
    axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
    return response.data;
  },

  async clearAuth() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};

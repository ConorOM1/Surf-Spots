import { userMemStore } from "./mem/user-mem-store.js";
import { difficultyMemStore } from "./mem/difficulty-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";
import { userJsonStore } from "./json/user-json-store.js";
import { difficultyJsonStore } from "./json/difficulty-json-store.js";
import { spotJsonStore } from "./json/spot-json-store.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { difficultyMongoStore } from "./mongo/difficulty-mongo-store.js";
import { spotMongoStore } from "./mongo/spot-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

export const db = {
  userStore: null,
  difficultyStore: null,
  spotStore: null,

  init(storeType) {
    switch (storeType) {
      case "json" :
        this.userStore = userJsonStore;
        this.difficultyStore = difficultyJsonStore;
        this.spotStore = spotJsonStore;
        break;
      case "mongo" :
        this.userStore = userMongoStore;
        this.difficultyStore = difficultyMongoStore;
        this.spotStore = spotMongoStore;
        connectMongo();
        break;
      default :
        this.userStore = userMemStore;
        this.difficultyStore = difficultyMemStore;
        this.spotStore = spotMemStore;
    }
  }
};

import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testDifficulties, testSpots, beginner, intermediate, advanced, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Spot Model tests", () => {

  let beginnerList = null;

  setup(async () => {
    db.init("mongo");
    await db.difficultyStore.deleteAllDifficulties();
    await db.spotStore.deleteAllSpots();
    beginnerList = await db.difficultyStore.addDifficulty(beginner);
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testSpots[i] = await db.spotStore.addSpot(beginnerList._id, testSpots[i]);
    }
  });

  test("create single spot", async () => {
    const intermediateList = await db.difficultyStore.addDifficulty(intermediate);
    const spot = await db.spotStore.addSpot(intermediateList._id, advanced)
    assert.isNotNull(spot._id);
    assertSubset (advanced, spot);
  });

  test("create multiple spotApi", async () => {
    const spots = await db.difficultyStore.getDifficultyById(beginnerList._id);
    assert.equal(testSpots.length, testSpots.length)
  });

  test("delete all spotApi", async () => {
    const spots = await db.spotStore.getAllSpots();
    assert.equal(testSpots.length, spots.length);
    await db.spotStore.deleteAllSpots();
    const newSpots = await db.spotStore.getAllSpots();
    assert.equal(0, newSpots.length);
  });

  test("get a spot - success", async () => {
    const intermediateList = await db.difficultyStore.addDifficulty(intermediate);
    const spot = await db.spotStore.addSpot(intermediateList._id, advanced)
    const newSpot = await db.spotStore.getSpotById(spot._id);
    assertSubset (advanced, newSpot);
  });

  test("delete One Spot - success", async () => {
    const id = testSpots[0]._id;
    await db.spotStore.deleteSpot(id);
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testDifficulties.length - 1);
    const deletedSpot = await db.spotStore.getSpotById(id);
    assert.isNull(deletedSpot);
  });

  test("get a difficulty - bad params", async () => {
    assert.isNull(await db.spotStore.getSpotById(""));
    assert.isNull(await db.spotStore.getSpotById());
  });

  test("delete One User - fail", async () => {
    await db.spotStore.deleteSpot("bad-id");
    const spots = await db.spotStore.getAllSpots();
    assert.equal(spots.length, testDifficulties.length);
  });
});

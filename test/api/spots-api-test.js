import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { surfspotsService } from "./surfspots-service.js";
import { maggie, maggieCredentials, beginner, testDifficulties, testSpots, intermediate } from "../fixtures.js";


suite("Spot API tests", () => {
  let user = null;
  let easkey = null;

  setup(async () => {
    surfspotsService.clearAuth();
    user = await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggieCredentials);
    await surfspotsService.deleteAllDifficulties();
    await surfspotsService.deleteAllSpots();
    await surfspotsService.deleteAllUsers();
    user = await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggieCredentials);
    beginner.userid = user._id;
    easkey = await surfspotsService.createDifficulty(beginner);
  });

  teardown(async () => {});

  test("create spot", async () => {
    const returnedSpot = await surfspotsService.createSpot(easkey._id, intermediate);
    assertSubset(intermediate, returnedSpot);
  });

  test("create Multiple spots", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await surfspotsService.createSpot(easkey._id, testSpots[i]);
    }
    const returnedSpots = await surfspotsService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await surfspotsService.getSpot(returnedSpots[i]._id);
      assertSubset(spot, returnedSpots[i]);
    }
  });

  test("Delete SpotApi", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await surfspotsService.createSpot(easkey._id, testSpots[i]);
    }
    let returnedSpots = await surfspotsService.getAllSpots();
    assert.equal(returnedSpots.length, testSpots.length);
    for (let i = 0; i < returnedSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const spot = await surfspotsService.deleteSpot(returnedSpots[i]._id);
    }
    returnedSpots = await surfspotsService.getAllSpots();
    assert.equal(returnedSpots.length, 0);
  });

  test("denormalised difficulty", async () => {
    for (let i = 0; i < testSpots.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await surfspotsService.createSpot(easkey._id, testSpots[i]);
    }
    const returnedDifficulty = await surfspotsService.getDifficulty(easkey._id);
    assert.equal(returnedDifficulty.spots.length, testSpots.length);
    for (let i = 0; i < testSpots.length; i += 1) {
      assertSubset(testSpots[i], returnedDifficulty.spots[i]);
    }
  });
});

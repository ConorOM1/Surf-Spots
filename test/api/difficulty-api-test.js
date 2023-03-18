import { EventEmitter } from "events";
import { assert } from "chai";
import { surfspotsService } from "./surfspots-service.js";
import { assertSubset } from "../test-utils.js";
import { maggie, beginner, testDifficulties } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Difficulty API tests", () => {
  let user = null;

  setup(async () => {
    surfspotsService.clearAuth();
    user = await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggie);
    await surfspotsService.deleteAllDifficulties();
    await surfspotsService.deleteAllUsers();
    user = await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggie);
    beginner.userid = user._id;
  });

  teardown(async () => {});

  test("create difficulty", async () => {
    const returnedDifficulty = await surfspotsService.createDifficulty(beginner);
    assert.isNotNull(returnedDifficulty);
    assertSubset(beginner, returnedDifficulty);
  });

  test("delete a difficulty", async () => {
    const difficulty = await surfspotsService.createDifficulty(beginner);
    const response = await surfspotsService.deleteDifficulty(difficulty._id);
    assert.equal(response.status, 204);
    try {
      const returnedDifficulty = await surfspotsService.getDifficulty(difficulty.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Difficulty with this id", "Incorrect Response Message");
    }
  });

  test("create multiple difficulties", async () => {
    for (let i = 0; i < testDifficulties.length; i += 1) {
      testDifficulties[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await surfspotsService.createDifficulty(testDifficulties[i]);
    }
    let returnedLists = await surfspotsService.getAllDifficulties();
    assert.equal(returnedLists.length, testDifficulties.length);
    await surfspotsService.deleteAllDifficulties();
    returnedLists = await surfspotsService.getAllDifficulties();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant difficulty", async () => {
    try {
      const response = await surfspotsService.deleteDifficulty("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Difficulty with this id", "Incorrect Response Message");
    }
  });
});

import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testDifficulties, beginner } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";


suite("Difficulty Model test", () => {

  setup(async () => {
    db.init("mongo");
    await db.difficultyStore.deleteAllDifficulties();
    for (let i = 0; i < testDifficulties.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testDifficulties[i] = await db.difficultyStore.addDifficulty(testDifficulties[i]);
    }
  });

  test("create a difficulty", async () => {
    const difficulty = await db.difficultyStore.addDifficulty(beginner);
    assertSubset(beginner, difficulty);
    assert.isDefined(difficulty._id);
  });

  test("delete all difficulties", async () => {
    let returnedDifficulties = await db.difficultyStore.getAllDifficulties();
    assert.equal(returnedDifficulties.length, 3);
    await db.difficultyStore.deleteAllDifficulties();
    returnedDifficulties = await db.difficultyStore.getAllDifficulties();
    assert.equal(returnedDifficulties.length, 0);
  });

  test("get a difficulty - success", async () => {
    const difficulty = await db.difficultyStore.addDifficulty(beginner);
    const returnedDifficulty = await db.difficultyStore.getDifficultyById(difficulty._id);
    assertSubset(beginner, difficulty);
  });

  test("delete One Difficulty - success", async () => {
    const id = testDifficulties[0]._id;
    await db.difficultyStore.deleteDifficultyById(id);
    const returnedDifficulties = await db.difficultyStore.getAllDifficulties();
    assert.equal(returnedDifficulties.length, testDifficulties.length - 1);
    const deletedDifficulty = await db.difficultyStore.getDifficultyById(id);
    assert.isNull(deletedDifficulty);
  });

  test("get a difficulty - bad params", async () => {
    assert.isNull(await db.difficultyStore.getDifficultyById(""));
    assert.isNull(await db.difficultyStore.getDifficultyById());
  });

  test("delete One Difficulty - fail", async () => {
    await db.difficultyStore.deleteDifficultyById("bad-id");
    const allDifficulties = await db.difficultyStore.getAllDifficulties();
    assert.equal(testDifficulties.length, allDifficulties.length);
  });
});

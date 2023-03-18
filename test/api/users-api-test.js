import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { surfspotsService } from "./surfspots-service.js";
import { maggie, maggieCredentials, testUsers } from "../fixtures.js";
import { db } from "../../src/models/db.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    surfspotsService.clearAuth();
    await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggieCredentials);
    await surfspotsService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await surfspotsService.createUser(testUsers[i]);
    }
    await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggieCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await surfspotsService.createUser(maggie);
    assertSubset(maggie, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all user", async () => {
    let returnedUsers = await surfspotsService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await surfspotsService.deleteAllUsers();
    await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggieCredentials);
    returnedUsers = await surfspotsService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user", async () => {
    const returnedUser = await surfspotsService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });

  test("get a user - bad id", async () => {
    try {
      const returnedUser = await surfspotsService.getUser("1234");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 503);
    }
  });

  test("get a user - deleted user", async () => {
    await surfspotsService.deleteAllUsers();
    await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggieCredentials);
    try {
      const returnedUser = await surfspotsService.getUser(users[0]._id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id");
      assert.equal(error.response.data.statusCode, 404);
    }
  });
});

import { assert } from "chai";
import { surfspotsService } from "./surfspots-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    surfspotsService.clearAuth();
    await surfspotsService.createUser(maggie);
    await surfspotsService.authenticate(maggie);
    await surfspotsService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await surfspotsService.createUser(maggie);
    const response = await surfspotsService.authenticate(maggie);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await surfspotsService.createUser(maggie);
    const response = await surfspotsService.authenticate(maggie);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    surfspotsService.clearAuth();
    try {
      await surfspotsService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});

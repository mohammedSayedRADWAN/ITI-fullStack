const request = require("supertest");

const app = require("..");
const { clearDatabase } = require("../db.connection");

describe("user routes:", () => {
  const testAgent = request(app);
  afterEach(async () => {
    await clearDatabase();
  });
  it("(GET /api/user) should respond with users=[]", async () => {
    let res = await testAgent.get("/api/user");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveSize(0);
  });
  it("(POST /api/user/signup) should respond with the new user", async () => {
    let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
    let res = await testAgent.post("/api/user/signup").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body.data.email).toEqual(newUser.email);
  });
  it('(POST /api/user/signup) with duplicate email should respond with "email already exists"', async () => {
    let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
    await testAgent.post("/api/user/signup").send(newUser);

    let res = await testAgent.post("/api/user/signup").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/email is already exists/i);
  });
  it('(POST /api/user/login) should respond with token', async () => {

    let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
    await testAgent.post("/api/user/signup").send(newUser);

    let res = await testAgent.post("/api/user/login").send(newUser);
    expect(res.status).toBe(200);
    expect(res.body.data.split(".")).toHaveSize(3)
  });
  it("(GET /api/user/id) should respond with the user", async () => {
    let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
    let resUserInDB = await testAgent.post("/api/user/signup").send(newUser);
    let id = resUserInDB.body.data._id

    let res = await testAgent.get("/api/user/" + id);
    expect(res.status).toBe(200);
    expect(res.body.data._id).toBe(id);
    expect(res.body.data.email).toBe(resUserInDB.body.data.email);
  });


  // lap test--------------------------------------------
  it("(GET /api/user/search) should respond with the correct user with the name requested", async () => {
    let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
    await testAgent.post("/api/user/signup").send(newUser);

    let res = await testAgent.get("/api/user/search").query({ name: "ali" });
    expect(res.status).toBe(200);
    expect(res.body.data.name).toBe("ali");
  });

  it("GET /api/user/search with invalid name should respond with status 404 and the message", async () => {
    let res = await testAgent.get("/api/user/search").query({ name: "nonexistent" });
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/There is no user with name/i);
  });

  it("(DELETE /api/user/) should delete all users and respond with message", async () => {
    let newUser = { name: "ali", email: "ali@test.com", password: "123456" };
    await testAgent.post("/api/user/signup").send(newUser);

    let res = await testAgent.delete("/api/user/");
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/users have been deleted successfully/i);

    let checkRes = await testAgent.get("/api/user");
    expect(checkRes.body.data).toHaveSize(0);
  });

  it("(GET /api/user/id) with id not exists: should respond with status 404 and the message", async () => {
    let res = await testAgent.get("/api/user/66360c7f7663952f1463952c");
    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/there is no user with this id/i);
  });
});

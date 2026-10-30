// backend/tests/api.test.js
const request = require("supertest");
const app = require("../server");

describe("API Health & Task Endpoints", () => {
  // Test 1: Verify the server health check / root endpoint
  test("GET / returns 200 and welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.status).toBe("Running");
  });

  // Test 2: Verify undefined route returns 404
  test("GET /api/nonexistent returns 404 status", async () => {
    const res = await request(app).get("/api/nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });

  // Test 3: Verify protected tasks endpoint requires authentication
  test("GET /api/tasks returns 401 without authorization token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401);
  });
});

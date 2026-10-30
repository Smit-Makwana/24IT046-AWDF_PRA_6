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

  // Test 4: Verify AI description generation returns fallback gracefully when key is missing or mock
  test("POST /api/ai/generate-description returns description with graceful degradation", async () => {
    const res = await request(app)
      .post("/api/ai/generate-description")
      .send({ title: "Annual Tech Symposium", category: "Technology" });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(typeof res.body.description).toBe("string");
    expect(res.body.description.length).toBeGreaterThan(0);
  });

  // Test 5: Verify AI endpoint validates required title
  test("POST /api/ai/generate-description returns 400 when title is missing", async () => {
    const res = await request(app)
      .post("/api/ai/generate-description")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

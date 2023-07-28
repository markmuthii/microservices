import request from "supertest";
import { app } from "../../../app";

describe("Signup", () => {
  test("Returns 201 on successful signup", async () => {
    return request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);
  });

  test("Returns 400 on invalid email or password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "invalid email",
        password: "password",
      })
      .expect(400);

    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "pas",
      })
      .expect(400);
  });

  test("Returns 400 if email already exists", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  test("Sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

describe("Signin", () => {
  test("Returns 400 if email or password is not provided", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
      })
      .expect(400);

    await request(app)
      .post("/api/users/signin")
      .send({
        password: "password",
      })
      .expect(400);
  });

  test("Returns 400 if email does not exist", async () => {
    return request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(400);
  });

  test("Returns 200 and sets a cookie if signin is successful", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});

describe("Current User", () => {});

describe("All Users", () => {});

describe("Signout", () => {});

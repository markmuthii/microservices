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

describe("Current User", () => {
  test("Returns 401 and currentUser null if user is not authenticated", async () => {
    const response = await request(app)
      .get("/api/users/currentuser")
      .send()
      .expect(401);

    expect(response.body.currentUser).toBeNull();
  });

  test("Returns details of current user", async () => {
    const cookie = await global.signup();

    const response = await request(app)
      .get("/api/users/currentuser")
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual("test@test.com");
  });
});

describe("All Users", () => {
  const url = "/api/users";

  test("Returns 401 if not authenticated", async () => {
    await request(app).get(url).send().expect(401);
  });

  test("Returns an array of all users if authenticated", async () => {
    const cookie = await global.signup();

    const response = await request(app)
      .get(url)
      .set("Cookie", cookie)
      .send()
      .expect(200);

    expect(response.body[0].email).toEqual("test@test.com");
  });
});

describe("Signout", () => {
  test("Clears the cookie after successful signout", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password",
      })
      .expect(201);

    const response = await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(205);

    expect(response.get("Set-Cookie")[0]).toEqual(
      "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
    );
  });
});

const request = require("supertest");
const express = require("express");
const launchesRouter = require("./launches.router")

const app = express();
app.use(express.json());
app.use("/launches", launchesRouter);

describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
        const response = await request(app).get("/launches");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })
})

describe("Test POST/launches", () => {
    test("It should respond with 201 created", async () => {
        const newLaunch = {
            mission: "USS Enterprise",
            rocket: "NCC-1701-D",
            launchDate: "2023-10-04T14:00:00.000Z",
            target: "Kepler-186 f",
        };
        const response = await request(app).post("/launches").send(newLaunch);
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(newLaunch);
    })
    test("It should catch missing required properties", async () => {
        const newLaunch = {
            mission: "USS Enterprise",
            launchDate: "2023-10-04T14:00:00Z",
            target: "Kepler-186 f",
        };
        const response = await request(app).post("/launches").send(newLaunch);
        expect(response.statusCode).toBe(400);
    })
    test("It should catch invalid dates", async () => {
        const newLaunch = {
            mission: "USS Enterprise",
            rocket: "NCC-1701-D",
            launchDate: "not a date",
            target: "Kepler-186 f",
        };
        const response = await request(app).post("/launches").send(newLaunch);
        expect(response.statusCode).toBe(400);
    })

})

module.exports = app;
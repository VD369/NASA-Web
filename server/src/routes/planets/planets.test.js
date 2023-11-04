const request = require("supertest")
const express = require("express")
const planetsRouter = require("./planets.router")

const app = express()
app.use("/planets", planetsRouter)

const {loadPlanetsData} = require("../../models/planets.model")

beforeAll(async () => {
    await loadPlanetsData()
})

describe("Test GET /planets", () => {
    test("It should respond with an array of habitable planets", async () => {
        const response = await request(app).get("/planets");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    })
})

module.exports = app;
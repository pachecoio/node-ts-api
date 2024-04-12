import { initDB } from "@/adapters/database"
import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose, { Mongoose } from "mongoose"
import { Repository } from "../repository"

describe("Test repository layer", () => {
    let mongod: MongoMemoryServer
    let conn: Mongoose

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create()
        let uri = mongod.getUri()
        conn = await initDB(uri)
    })

    afterAll(async () => {
        await mongod.stop()
        await conn.disconnect()
    })

    type Sample = {
        name: string
    }

    const sampleSchema = new mongoose.Schema<Sample>({
        name: String
    })

    test("should create a sample", async () => {
        const repo = new Repository("sample", sampleSchema)
        const sampleToCreate = { name: "custom name" }
        const created = await repo.create(sampleToCreate)
        expect(created.name).toBe("custom name")

        // Ensure it was created
        const model = mongoose.model("sample");
        const items = await model.find()
        expect(items).toHaveLength(1)
    })

})

import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"
import { initDB } from "../database"

describe("Test database", () => {
    let mongod: MongoMemoryServer

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create()
    })

    afterAll(async () => {
        await mongod.stop()
    })

    test("Should connect to a db in memory", async () => {
        let uri = mongod.getUri()
        const conn = await initDB(uri)

        // @ts-ignore
        const Cat = mongoose.model('Cat', { name: String });
        const kitty = new Cat({ name: 'Zildjian' });
        const res = await kitty.save()

        expect(res.name).toBe("Zildjian")

        await conn.disconnect()

    })

})

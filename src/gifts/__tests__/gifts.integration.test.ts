import { MongoMemoryServer } from "mongodb-memory-server"
import { giftRepository } from "../giftRepository"
import { createGift } from "../gifts"
import { Mongoose } from "mongoose"
import { initDB } from "@/adapters/database"

describe("Test service layer integration", () => {
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

    test("Can create a gift", async () => {
        const params = {
            name: "Skateboard",
            description: "The first gitft is always the best, and it should be a skateboard",
            url: "https://flip.com/luan-deck"
        }
        const repo = await giftRepository()
        const res = await createGift(repo, params)
        expect(res).toMatchObject({...params})
    })
})

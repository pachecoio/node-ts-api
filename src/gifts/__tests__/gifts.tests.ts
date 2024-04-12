import { createGift } from "../gifts"

describe("Test service layer", () => {
    test("Can create a gift successfully", async () => {
        const params = {
            name: "Skateboard",
            description: "The first gitft is always the best, and it should be a skateboard",
            url: "https://flip.com/luan-deck"
        }
        const repo = {
            create: jest.fn().mockResolvedValue({...params})
        }
        const res = await createGift(repo, params)
        expect(res).toMatchObject({...params})
    })

    test("fails to create a gift / db issues", async () => {
        const params = {
            name: "Skateboard",
            description: "The first gitft is always the best, and it should be a skateboard",
            url: "https://flip.com/luan-deck"
        }
        const repo = {
            create: jest.fn().mockRejectedValue(new Error("db not connected"))
        }
        expect(createGift(repo, params)).rejects.toThrow("db not connected")
    })
})

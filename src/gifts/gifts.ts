import { Gift } from "./models/gift";

export function createGift(repo: GiftRepository, params: GiftParams): Promise<Gift> {
    return repo.create({
        ...params,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

type GiftParams = {
    name: string,
    description: string,
    url: string,
}

interface GiftRepository {
    create(gift: Gift): Promise<Gift>
}

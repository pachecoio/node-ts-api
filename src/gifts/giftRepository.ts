import { Repository } from "@/repositories/repository"
import mongoose from "mongoose"
import { Gift } from "./models/gift"

const MODEL_NAME = "gift"
const schema = new mongoose.Schema<Gift>({
    name: String,
    description: String,
    url: String,
    createdAt: Date,
    updatedAt: Date,
})

export async function giftRepository() {
    return new Repository(MODEL_NAME, schema)
}

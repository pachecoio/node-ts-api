import mongoose from "mongoose"

export function initDB(uri?: string) {
    const _uri = uri || process.env.MONGODB_URI || "mongodb://localhost/test"
    return mongoose.connect(_uri)
}

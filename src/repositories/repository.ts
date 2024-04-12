import mongoose, { Schema } from "mongoose";

export class Repository<T> {
    private modelName: string
    private schema: Schema<T>

    constructor(modelName: string, schema: Schema<T>) {
        this.modelName = modelName
        this.schema = schema
    }

    async create(entity: T): Promise<T> {
        const model = this.getModel()
        const item = new model({...entity})
        return await item.save() as T
    }

    private getModel() {
        return mongoose.model<T>(this.modelName, this.schema)
    }
}


import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// Explicitly use the extended global type for `global.mongoose`
declare global {
    var mongoose: MongooseConnection;
}

// Ensure `global.mongoose` is initialized
global.mongoose = global.mongoose || { conn: null, promise: null };

export const connectToDatabase = async (): Promise<Mongoose> => {
    if (global.mongoose.conn) {
        return global.mongoose.conn;
    }

    if (!MONGODB_URL) {
        throw new Error("Missing MONGODB_URL");
    }

    if (!global.mongoose.promise) {
        global.mongoose.promise = mongoose.connect(MONGODB_URL, {
            dbName: "imaginify",
            bufferCommands: false,
        });
    }

    global.mongoose.conn = await global.mongoose.promise;
    return global.mongoose.conn;
};

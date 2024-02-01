import { MongoClient } from "mongodb";

// Replace with your MongoDB connection string.
const uri = "mongodb.env.MONGODB_URI as string";
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
}

class Singleton {
  private static _instance: Singleton;
  private client: MongoClient;
  private clientPromise: Promise<MongoClient>;

  private constructor() {
    this.client = new MongoClient(uri, options);
    this.clientPromise = this.client.connect();

    if (process.env.NODE_ENV === "development") {
      // In development mode, use a global variable to preserve the value
      // across mpdule reloads casused bt HMR (Hot Moodule Replacement).
      global._mongoClientPromise = this.clientPromise;
    }
  }

  public static get instance() {
    if (!this._instance) {
      this._instance = new Singleton();
    }
    return this._instance.clientPromise;
  }
}

const clientPromise = Singleton.instance;

// Export a module-scoped MongoClient promise.
// By doing this in a separate module,
// the client can be shared across functions.
export default clientPromise;

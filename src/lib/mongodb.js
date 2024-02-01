"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
// Replace with your MongoDB connection string.
var uri = "mongodb.env.MONGODB_URI as string";
var options = {};
var Singleton = /** @class */ (function () {
    function Singleton() {
        this.client = new mongodb_1.MongoClient(uri, options);
        this.clientPromise = this.client.connect();
        if (process.env.NODE_ENV === "development") {
            // In development mode, use a global variable to preserve the value
            // across mpdule reloads casused bt HMR (Hot Moodule Replacement).
            global._mongoClientPromise = this.clientPromise;
        }
    }
    Object.defineProperty(Singleton, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new Singleton();
            }
            return this._instance.clientPromise;
        },
        enumerable: false,
        configurable: true
    });
    return Singleton;
}());
var clientPromise = Singleton.instance;
// Export a module-scoped MongoClient promise.
// By doing this in a separate module,
// the client can be shared across functions.
exports.default = clientPromise;

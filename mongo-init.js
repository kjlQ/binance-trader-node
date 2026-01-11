db.createUser(
    {
        user: "core",
        pwd: "core",
        roles: [
            {
                role: "readWrite",
                db: "core"
            }
        ]
    }
);

// Create trading collection
db.createCollection("tradings");

// Create indexes for better performance
db.tradings.createIndex({ "timestamp": -1 });
db.tradings.createIndex({ "symbol": 1 });

// Create logs collection
db.createCollection("logs");

// Create indexes for logs
db.logs.createIndex({ "timestamp": -1 });

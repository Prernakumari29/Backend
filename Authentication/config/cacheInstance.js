const redis = require("ioredis");

const cacheInstance = new redis({
    host:"timeless-vegetable-expansion-88206.db.redis.io",
    port:18364,
    password:"41VQ9JszZTkbjF9jURdjR2nFvW9qUgUm"
})

module.exports = cacheInstance;
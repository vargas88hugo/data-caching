const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const client = redis.createClient(process.env.REDIS_URL);
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

const cacheRedis = () => {
  mongoose.Query.prototype.cache = function (options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');

    return this;
  };

  mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
      return exec.apply(this, arguments);
    }

    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
      })
    );

    const cacheValue = await client.hget(this.hashKey, key);

    if (cacheValue) {
      return JSON.parse(cacheValue);
    }

    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result));

    return result;
  };
};

const clearHash = (hashKey) => {
  client.del(JSON.stringify(hashKey));
};

module.exports = {
  cacheRedis,
  clearHash,
};

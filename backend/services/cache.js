const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const client = redis.createClient(process.env.REDIS_URL);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

const cache = () => {
  mongoose.Query.prototype.exec = async function () {
    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        collection: this.mongooseCollection.name,
      })
    );

    const cacheValue = await client.get(key);

    if (cacheValue) {
      console.log(cacheValue);

      return JSON.parse(cacheValue);
    }

    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result));

    return result;
  };
};

module.exports = cache;

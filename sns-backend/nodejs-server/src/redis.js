import { createClient } from 'redis';

export let redisClient;
const redisConnect = () => {
  console.log('redis 연결');
  redisClient = createClient({
    url: process.env.REDIS_URL,
    legacyMode: true,
  });
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.set('test key', 'test value');
  redisClient.get('test key', function (err, reply) {
    // reply is null when the key is missing
    console.log(reply);
  });
};

export default redisConnect;

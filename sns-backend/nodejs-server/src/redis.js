import { createClient } from 'redis';

export let redisClient;
const redisConnect = async () => {
  console.log('redis 연결');
  redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  await redisClient.connect();
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  await redisClient.set('test key', 'test value');
  console.log(await redisClient.get('test key'));
};

export default redisConnect;

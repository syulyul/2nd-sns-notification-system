package bitcamp.myapp.service;

import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.SetOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

@Service
public class RedisService {

  private final StringRedisTemplate redisTemplate;

  public RedisService(StringRedisTemplate redisTemplate) {
    System.out.println("RedisService() 호출됨!");
    this.redisTemplate = redisTemplate;
  }

  public ValueOperations getValuleOps() {
    return redisTemplate.opsForValue();
  }

  public ListOperations getListOps() {
    return redisTemplate.opsForList();
  }

  public SetOperations getSetOps() {
    return redisTemplate.opsForSet();
  }

  public ZSetOperations getSortedSetOps() {
    return redisTemplate.opsForZSet();
  }

  public HashOperations getHashOps() {
    return redisTemplate.opsForHash();
  }


}
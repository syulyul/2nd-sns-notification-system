package bitcamp.myapp.controller;

import bitcamp.myapp.service.RedisService;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class RedisController {
//레디스 테스트

  @Autowired
  RedisService redisService;

  @RequestMapping(value = "/redis/test/getString")
  @ResponseBody
  public String getValue(String testkey) {
    return redisService.getStringOps(testkey);
  }


  @RequestMapping(value = "/redis/test/setSets")
  @ResponseBody
  public void setSets(String testkey, String... testvalues) {
    redisService.setSetOps(testkey, testvalues);
  }

  @RequestMapping(value = "/redis/test/getSets")
  @ResponseBody
  public Set getSets(String key) {
    return redisService.getSetOps(key);
  }

}
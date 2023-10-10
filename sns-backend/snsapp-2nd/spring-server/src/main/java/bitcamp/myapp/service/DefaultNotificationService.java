package bitcamp.myapp.service;

import bitcamp.myapp.dao.NotificationDao;
import bitcamp.myapp.vo.NotiLog;
import bitcamp.myapp.vo.NotiType;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class DefaultNotificationService implements NotificationService {

  @Autowired
  ServletContext context;
  @Autowired
  NotificationDao notificationDao;

  {
    System.out.println("DefaultNotificationService 생성됨!");
  }

  @Transactional
  @Override
  public int add(NotiLog notiLog) throws Exception {
    RestTemplate restTemplate = new RestTemplate();

    // Header set
    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);

    // Body set
    MultiValueMap<String, String> body = new ObjectMapper().convertValue(notiLog,
        new TypeReference<MultiValueMap<String, String>>() {
        });

    // Message
    HttpEntity<?> requestMessage = new HttpEntity<>(body, httpHeaders);

    // Request
    String url = "http://localhost:3001/node/notification/add";
    HttpEntity<String> response = restTemplate.postForEntity(url, requestMessage, String.class);
    System.out.println(response);

    /////////////////////////////////////////////////////////////////////////////////////////////
    int result = notificationDao.insert(notiLog);
    String key = "notReadNotiCount" + notiLog.getMemberNo();
    Integer value = (Integer) context.getAttribute(key);
    if (value == null) {
      value = notificationDao.getNotiLogCount(notiLog.getMemberNo());
      context.setAttribute(key, value);
    } else {
      context.setAttribute(key, value + 1);
    }
    return result;
  }

  @Override
  public List<NotiLog> notiLogList(int memberNo, int limit, int page) throws Exception {
    return notificationDao.findAllNotiLog(memberNo, limit, limit * (page - 1));
  }

  @Override
  public int notiLogCount(int memberNo) throws Exception {
    return notificationDao.getNotiLogCount(memberNo);
  }

  @Override
  public int notReadNotiLogCount(int memberNo) throws Exception {
    return notificationDao.getNotReadNotiLogCount(memberNo);
  }

  @Override
  public NotiLog getNotiLog(int notiNo) throws Exception {
    return notificationDao.findBy(notiNo);
  }

  @Transactional
  @Override
  public int updateState(NotiLog notiLog, int notiState) throws Exception {
    int result = notificationDao.updateState(notiLog.getNo(), notiState);
    String key = "notReadNotiCount" + notiLog.getMemberNo();
    Integer value = (Integer) context.getAttribute(key);
    if (value == null) {
      value = notificationDao.getNotiLogCount(notiLog.getMemberNo());
      context.setAttribute(key, value);
    } else {
      context.setAttribute(key, value - 1);
    }
    return result;
  }

  @Override
  public int updateAllState(int memberNo, int notiState) {
    return notificationDao.updateAllState(memberNo, notiState);
  }

  @Override
  public List<NotiType> notiTypeList() throws Exception {
    return notificationDao.findAllNotiType();
  }

  @Override
  public String getNotiTypeName(int notiTypeNo) {
    return notificationDao.findNotiTypeName(notiTypeNo);
  }
}

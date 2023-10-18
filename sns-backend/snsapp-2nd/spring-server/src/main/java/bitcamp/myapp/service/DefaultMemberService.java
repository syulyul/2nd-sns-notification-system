package bitcamp.myapp.service;

import bitcamp.myapp.App;
import bitcamp.myapp.dao.MemberDao;
import bitcamp.myapp.vo.Member;
import java.util.List;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
public class DefaultMemberService implements MemberService {

  MemberDao memberDao;

  {
    System.out.println("DefaultMemberService 생성됨!");
  }

  public DefaultMemberService(MemberDao memberDao) {
    this.memberDao = memberDao;
  }

  @Transactional
  @Override
  public int add(Member member) throws Exception {

    int result = memberDao.insert(member);
    if (result != 0) {
      RestTemplate restTemplate = new RestTemplate();

      // Header set
      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.setContentType(MediaType.APPLICATION_JSON);

      // Message
      HttpEntity<?> requestMessage = new HttpEntity<>(member, httpHeaders);

      // Request
      String url = App.NODE_SERVER_URL + "/node/user/add";
      ResponseEntity<String> nodeResponse = restTemplate.postForEntity(url, requestMessage,
          String.class);
    }

    return result;
  }

  @Override
  public List<Member> list() throws Exception {
    return memberDao.findAll();
  }

  @Override
  public Member get(int memberNo) throws Exception {
    return memberDao.findBy(memberNo);
  }

  @Override
  public Member get(String phoneNumber, String password) throws Exception {
    return memberDao.findByPhoneNumberAndPassword(phoneNumber, password);
  }

  @Transactional
  @Override
  public int update(Member member) throws Exception {
    int result = memberDao.update(member);
    if (result != 0) {
      RestTemplate restTemplate = new RestTemplate();

      // Header set
      HttpHeaders httpHeaders = new HttpHeaders();
      httpHeaders.setContentType(MediaType.APPLICATION_JSON);

      // Message
      HttpEntity<?> requestMessage = new HttpEntity<>(member, httpHeaders);

      // Request
      String url = App.NODE_SERVER_URL + "/node/user/update";
      ResponseEntity<String> nodeResponse = restTemplate.postForEntity(url, requestMessage,
          String.class);
    }

    return result;
  }

  @Transactional
  @Override
  public int delete(int memberNo) throws Exception {
    return memberDao.delete(memberNo);
  }
}

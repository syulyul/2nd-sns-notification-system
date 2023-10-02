package bitcamp.myapp.controller;

import bitcamp.myapp.service.BoardService;
import bitcamp.myapp.service.GuestBookService;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.service.MyPageService;
import bitcamp.myapp.service.NcpObjectStorageService;
import bitcamp.myapp.service.NotificationService;
import bitcamp.myapp.service.SmsService;
import bitcamp.myapp.vo.LoginUser;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.MyPage;
import java.util.HashSet;
import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  SmsService smsService;
  @Autowired
  MemberService memberService;
  @Autowired
  BoardService boardService;
  @Autowired
  GuestBookService guestBookService;
  @Autowired
  MyPageService myPageService;
  @Autowired
  NotificationService notificationService;
  @Autowired
  NcpObjectStorageService ncpObjectStorageService;
  @Autowired
  ServletContext context;

  {
    System.out.println("AuthController 생성됨!");
  }

  @GetMapping("form")
  public void form(
      @CookieValue(required = false) String phoneNumber,
      HttpSession session,
      Model model) {
    // model.addAttribute("phoneNumber", phoneNumber);
    session.setAttribute("phoneNumber", phoneNumber);
  }

  @GetMapping("add")
  public String add() {
    return "auth/membership";
  }

  @GetMapping("find")
  public String find() {
    return "auth/loginfind";
  }

  @PostMapping("/login")
  public LoginUser login(
      @RequestBody Member member,
      HttpSession session,
      HttpServletResponse response,
      Model model) {
    String phoneNumber = member.getPhoneNumber();
    String password = member.getPassword();
    System.out.println(member);
    phoneNumber = phoneNumber.replaceAll("\\D+", "");
    LoginUser loginUserObject = null;
    try {
      // 여기에서 phoneNumber와 password를 사용하여 회원 정보를 검증합니다.
      Member loginUser = memberService.get(phoneNumber, password);
      if (loginUser != null) {
        // 로그인 성공 시 처리
        // 쿠키 설정
        Cookie cookie = new Cookie("test", phoneNumber);
        response.addCookie(cookie);

        // 세션에 로그인 사용자 정보 저장
        loginUserObject = new LoginUser(loginUser);
        loginUserObject.setFollowMemberSet(
            new HashSet<>(myPageService.followingList(loginUser.getNo())));
        loginUserObject.setLikeBoardSet(
            new HashSet<>(boardService.likelist(loginUser.getNo())));
        loginUserObject.setLikedGuestBookSet(
            new HashSet<>(guestBookService.likelist(loginUser.getNo())));

        int notReadNotiCount = notificationService.notReadNotiLogCount(loginUser.getNo());
        context.setAttribute("notReadNotiCount" + loginUser.getNo(), notReadNotiCount);
      }
    } catch (Exception e) {
      e.printStackTrace();
      // 예외 발생 시 처리
    }
    return loginUserObject;
  }

  @PostMapping("add")
  public String add(
      Member member,
      MultipartFile photofile,
      Model model) throws Exception {

    member.setPhoneNumber(member.getPhoneNumber().replaceAll("\\D+", ""));
    try {
      System.out.println(member);
      if (photofile.getSize() > 0) {
        String uploadFileUrl = ncpObjectStorageService.uploadFile(
            "bitcamp-nc7-bucket-14", "sns_member/", photofile);
        member.setPhoto(uploadFileUrl);
      }
      memberService.add(member);
      MyPage myPage = new MyPage();
      myPage.setNo(member.getNo());
      myPageService.add(myPage);

      return "auth/form";

    } catch (Exception e) {
      model.addAttribute("message", "회원 등록 오류!");
      model.addAttribute("refresh", "2;url=list");
      throw e;
    }
  }

  @PostMapping("find")
  public String find(HttpSession session) throws Exception {
    session.invalidate();
    return "auth/loginfind";
  }

  @GetMapping("logout")
  public String logout(HttpSession session) throws Exception {
    session.invalidate();
    return "redirect:/";
  }

  @PostMapping("phoneAuth")
  @ResponseBody
  public Boolean phoneAuth(
      String phoneNumber,
      HttpSession session) {
    phoneNumber = phoneNumber.replaceAll("\\D+", "");
    try { // 이미 가입된 전화번호가 있으면
      if (smsService.memberTelCount(phoneNumber) > 0) {
        return true;
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    JSONObject toJson = new JSONObject();

    String code = smsService.sendRandomMessage(phoneNumber);
    session.setAttribute("rand", code);

    return false;
  }

  @PostMapping("phoneFind")
  @ResponseBody
  public Boolean phoneFind(String phoneNumber, HttpSession session) {
    phoneNumber = phoneNumber.replaceAll("\\D+", "");

    try {
      if (smsService.memberTelCountFind(phoneNumber) > 0) {
        return false;
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    JSONObject toJson = new JSONObject();

    String code = smsService.sendRandomMessage(phoneNumber);
    session.setAttribute("rand", code);

    return true;
  }

  @PostMapping("phoneAuthOk")
  @ResponseBody
  public Boolean phoneAuthOk(HttpSession session, HttpServletRequest request) {
    String rand = (String) session.getAttribute("rand");
    String code = request.getParameter("code");

    System.out.println(rand + " : " + code);

    if (rand != null && rand.equals(code)) {
      session.removeAttribute("rand");
      return false;
    }

    return true;
  }

  @PostMapping("/resetPassword")
  @ResponseBody
  public ResponseEntity<String> resetPassword(
      @RequestParam String phoneNumber,
      @RequestParam String newPassword) {
    phoneNumber = phoneNumber.replaceAll("\\D+", "");

    try {
      // 새로운 비밀번호로 업데이트
      smsService.updatePasswordByPhoneNumber(phoneNumber, newPassword);

      return new ResponseEntity<>("비밀번호 재설정이 완료되었습니다.", HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      // 예외 발생 시 처리
      return new ResponseEntity<>("비밀번호 변경 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
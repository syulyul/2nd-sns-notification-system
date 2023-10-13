package bitcamp.myapp.controller;

import bitcamp.myapp.service.BoardCommentService;
import bitcamp.myapp.service.BoardService;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.service.MyPageService;
import bitcamp.myapp.service.NcpObjectStorageService;
import bitcamp.myapp.service.RedisService;
import bitcamp.myapp.vo.LoginUser;
import bitcamp.myapp.vo.Member;
import bitcamp.myapp.vo.MyPage;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/myPage")
public class MyPageController {

  @Autowired
  MemberService memberService;

  @Autowired
  MyPageService myPageService;

  @Autowired
  BoardService boardService;

  @Autowired
  BoardCommentService boardCommentService;

  @Autowired
  NcpObjectStorageService ncpObjectStorageService;

  @Autowired
  RedisService redisService;

  {
    System.out.println("MyPageController 생성됨!");
  }

  @GetMapping("{no}")
  public ResponseEntity detail(
      @PathVariable int no,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "6") int pageSize,
      Model model,
      HttpSession session,
      @ModelAttribute("queryString") String queryString) throws Exception {

    // 세션에 저장된 방문한 마이페이지 번호 목록을 가져오기
//    HashSet<Integer> visitedMyPages = loginUser.getVisitedMyPages();

    // 만약 방문한 적 없는 마이페이지라면 조회수 증가
//    if (!visitedMyPages.contains(no) && loginUser.getNo() != no) {
//      myPageService.increaseVisitCount(no);
//
//      // 방문한 마이페이지 번호를 세션에 추가
//      visitedMyPages.add(no);
//    }

    HashMap<String, Object> returnMap = new HashMap<>();
    returnMap.put("myBoardList", boardService.myboardlist(1, no, pageSize, 1));
    returnMap.put("myCommentList", boardCommentService.mycommentlist(no, pageSize, 1));

    return new ResponseEntity<>(returnMap, HttpStatus.OK);
  }

  @PostMapping("{no}")
  public String searchMembers(
      @PathVariable int no,
      @RequestParam(defaultValue = "") String show,
      @RequestParam("keyword") String keyword,
      @RequestParam(defaultValue = "1") int page) throws Exception {
    String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
    String queryString = String.format("?show=%s&keyword=%s&page=%d", show, encodedKeyword, page);

    return "redirect:/myPage/" + no + queryString;
  }

  @GetMapping("{no}/info")
  public ResponseEntity<MyPage> info(
      @PathVariable int no,
      Model model,
      HttpServletRequest request,
      HttpSession session) throws Exception {
    MyPage myPage = myPageService.get(no);
    model.addAttribute("myPage", myPage);

    LoginUser loginUser = (LoginUser) session.getAttribute("loginUser");
    // request 객체가 null이 아닌 경우에만 모델에 추가
    if (request != null) {
      model.addAttribute("request", request);
    } else {
      return new ResponseEntity<>(myPage, HttpStatus.OK);
    }

    return new ResponseEntity<>(myPage, HttpStatus.OK);
  }

  @PostMapping("{no}/update")
  public String update(
      @RequestBody(required = false) MyPage myPage,
      @PathVariable int no,
      Model model,
      @RequestParam(required = false) MultipartFile photofile,
      HttpSession session) throws Exception {
    Member member = myPage;
    Member loginUser = memberService.get(member.getPhoneNumber(), member.getPassword());
    if (loginUser == null) {
      // 로그인되지 않은 경우 처리
      return "/auth/login"; // 로그인 페이지로 리다이렉트 또는 다른 처리
    }

    member.setPhoneNumber(member.getPhoneNumber().replaceAll("\\D+", ""));
    if (member.getNo() == myPage.getNo()) {
      if (photofile != null && !photofile.isEmpty()) {
        String uploadFileUrl = ncpObjectStorageService.uploadFile(
            "bitcamp-nc7-bucket-14", "sns_member/", photofile);
        member.setPhoto(uploadFileUrl);
      }

      myPage.setGender(myPage.getGender());
      myPage.setStateMessage(myPage.getStateMessage());
      // myPage.setEmail(email);
      myPage.setBirthday(myPage.getBirthday());
//        if (birthday.isEmpty()) {
//          birthday = null;
//        } else {
//          // 생일 값을 문자열에서 Timestamp로 변환
//          SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//          Date parsedDate = dateFormat.parse(birthday);
//          Timestamp timestamp = new Timestamp(parsedDate.getTime());
//
//          myPage.setBirthday(timestamp);
//
//        }

      if (member.getEmail() == null) {
        member.setEmail(""); // null인 경우 빈 문자열로 설정
      }
//      if (member.getEmail().equals(" ") || member.getEmail().isEmpty()) {
//        member.setEmail(" ");
//      }

      if (memberService.update(member) == 0 || myPageService.update(myPage) == 0) {
        throw new Exception("회원이 없습니다.");
      } else {
        // 사용자 정보 업데이트 후, 세션에 새 정보를 설정
        loginUser.setName(member.getName()); // 사용자 이름 업데이트
        loginUser.setNick(member.getNick()); // 사용자 닉네임 업데이트
        if (!photofile.isEmpty()) {
          loginUser.setPhoto(member.getPhoto()); // 사용자 사진 업데이트
        }

        // 세션에 업데이트된 loginUser 속성을 다시 설정
        session.setAttribute("loginUser", loginUser);

        return "/myPage/" + myPage.getNo();
      }

    } else {
      return "/myPageError";
    }

  }

  @GetMapping("{no}/update")
  public String delete(
      Member member,
      @PathVariable int no,
      Model model,
      HttpSession session) throws Exception {
    LoginUser loginUser = (LoginUser) session.getAttribute("loginUser");
    MyPage myPage = myPageService.get(member.getNo());

    if (loginUser.getNo() == myPage.getNo()) {
      member.setPhoto(null);
      myPage.setGender(0);
      myPage.setStateMessage(null);
      myPage.setEmail(null);
      myPage.setBirthday(null);
      member.setName("탈퇴한 사용자");
      member.setNick(
          (System.currentTimeMillis() >> 10) % 987 + "탈퇴한 사용자" + System.currentTimeMillis() % 1234);
      member.setPhoneNumber("000-" + System.currentTimeMillis());
      member.setPassword(null);
      myPage.setVisitCount(0);

      if (memberService.update(member) == 0 || myPageService.update(myPage) == 0) {
        throw new Exception("회원이 없습니다.");
      } else {
        session.invalidate();
        return "redirect:/";
      }
    } else {
      return "redirect:/error";
    }

  }

  @GetMapping("follow")
  public ResponseEntity follow(
      @RequestParam("followingNo") int followingNo,
      @CookieValue("sessionId") Cookie sessionCookie,
      HttpServletResponse response) throws Exception {

    try {
      String sessionId = sessionCookie.getValue();
      int loginUserNo = Integer.parseInt((String) redisService.getValueOps().get(sessionId));
      Member loginUser = memberService.get(loginUserNo);

      int result = myPageService.follow(loginUser, followingNo);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(followingNo, HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(followingNo, HttpStatus.OK);
  }

  @GetMapping("unfollow")
  public ResponseEntity unfollow(
      @RequestParam("followingNo") int followingNo,
      @CookieValue("sessionId") Cookie sessionCookie,
      HttpServletResponse response) throws Exception {

    try {
      String sessionId = sessionCookie.getValue();
      int loginUserNo = Integer.parseInt((String) redisService.getValueOps().get(sessionId));
      Member loginUser = memberService.get(loginUserNo);

      int result = myPageService.unfollow(loginUser, followingNo);

    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(followingNo, HttpStatus.BAD_REQUEST);

    }
    return new ResponseEntity<>(followingNo, HttpStatus.OK);
  }

  @GetMapping("/{no}/followers")
  @ResponseBody
  public ResponseEntity getFollowerList(@PathVariable int no) {
    List<Member> followerList;
    try {
      followerList = myPageService.followerList(no); // followerList를 가져오는 서비스 메서드 호출
    } catch (Exception e) {
      e.printStackTrace();
      // 예외 발생 시 처리
      return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(followerList, HttpStatus.OK);

  }

  @GetMapping("/{no}/following")
  @ResponseBody
  public ResponseEntity getFollowingList(@PathVariable int no) {
    List<Member> followingList;
    try {
      followingList = myPageService.followingList(no);
    } catch (Exception e) {
      e.printStackTrace();
      // 예외 발생 시 처리
      return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(followingList, HttpStatus.OK);
  }


  @GetMapping("/searchMembers")
  @ResponseBody
  public ResponseEntity searchMembers(
      @RequestParam(name = "searchTxt") String keyword,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "6") int pageSize) {
    List<Member> resultList;
//    String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
    try {
      resultList = myPageService.searchMembersList(keyword, pageSize, page);
    } catch (Exception e) {
      e.printStackTrace();
      // 예외 발생 시 처리
      return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
    }
    return new ResponseEntity<>(resultList, HttpStatus.OK);
  }

}

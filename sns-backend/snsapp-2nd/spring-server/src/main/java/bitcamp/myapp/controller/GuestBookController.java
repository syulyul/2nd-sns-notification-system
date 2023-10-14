package bitcamp.myapp.controller;

import bitcamp.myapp.service.GuestBookService;
import bitcamp.myapp.service.MemberService;
import bitcamp.myapp.service.RedisService;
import bitcamp.myapp.vo.GuestBook;
import bitcamp.myapp.vo.LoginUser;
import bitcamp.myapp.vo.Member;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CookieValue;

@RestController
@RequestMapping("/guestBook")
public class GuestBookController {

  @Autowired
  MemberService memberService;
  @Autowired
  GuestBookService guestBookService;
  @Autowired
  RedisService redisService;

  {
    System.out.println("GuestBookController 생성됨!");
  }

  @GetMapping("form")
  public void form() throws Exception {
  }

  @PostMapping("add")
  public ResponseEntity add(@RequestBody GuestBook guestBook, HttpSession session)
      throws Exception {
    System.out.println(guestBook);
    try {
      guestBookService.add(guestBook);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return new ResponseEntity<>(guestBook, HttpStatus.OK);
  }

  @DeleteMapping("delete/{guestBookNo}")
  public ResponseEntity delete(@PathVariable int guestBookNo, HttpSession session)
      throws Exception {
//    Member loginUser = (Member) session.getAttribute("loginUser");
//    if (loginUser == null) {
//      return new ResponseEntity<>("not exist writer", HttpStatus.BAD_REQUEST);
//    }

    GuestBook g = guestBookService.get(guestBookNo);

//    if (g == null || g.getWriter().getNo() != loginUser.getNo()) {
//      throw new Exception("해당 번호의 게시글이 없거나 삭제 권한이 없습니다.");
//    } else {
    guestBookService.delete(g.getNo());
    return new ResponseEntity<>(HttpStatus.OK);
//    }
  }

  @GetMapping("{no}")
  public ResponseEntity<Map<String, Object>> list(
      @PathVariable int no,
      @RequestParam(defaultValue = "1") int page,
      @RequestParam(defaultValue = "10") int pageSize,
      Model model, HttpSession session) throws Exception {
    int totalRecords;

    List<GuestBook> guestBookList = guestBookService.list(no, pageSize, page);
    totalRecords = guestBookService.getTotalCount(no);

//    model.addAttribute("guestBookList", guestBookList);
//    model.addAttribute("maxPage", (totalRecords + (pageSize - 1)) / pageSize);
//    model.addAttribute("page", page);
//    model.addAttribute("pageSize", pageSize);

    // 이 부분에서 회원의 닉네임을 가져와서 모델에 추가
    String guestBookOwnerNick = guestBookService.getMemberNickByNo(no);
//    model.addAttribute("guestBookOwnerNick", guestBookOwnerNick);
//
//    model.addAttribute("mpno", no);

    Map<String, Object> resultMap = new HashMap<>();
    resultMap.put("guestBookList", guestBookList);
    resultMap.put("guestBookOwnerNick", guestBookOwnerNick);

    return new ResponseEntity<>(resultMap, HttpStatus.OK);
  }

  // 좋아요 기능
  @PostMapping("like")
  public ResponseEntity like(@RequestParam int guestBookNo, @CookieValue("sessionId") Cookie sessionCookie) throws Exception {
    try {
      String sessionId = sessionCookie.getValue();
      int loginUserNo = Integer.parseInt((String) redisService.getValueOps().get(sessionId));
      Member loginUser = memberService.get(loginUserNo);
      GuestBook guestBook = guestBookService.get(guestBookNo);

      if (guestBook == null) {
        return new ResponseEntity<>(guestBookNo, HttpStatus.NOT_FOUND);
      }

      guestBookService.like(loginUser, guestBook);
      return new ResponseEntity<>(guestBookNo, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(guestBookNo, HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("unlike")
  public ResponseEntity unlike(@RequestParam int guestBookNo, @CookieValue("sessionId") Cookie sessionCookie) throws Exception {
    try {
      String sessionId = sessionCookie.getValue();
      int loginUserNo = Integer.parseInt((String) redisService.getValueOps().get(sessionId));
      Member loginUser = memberService.get(loginUserNo);
      GuestBook guestBook = guestBookService.get(guestBookNo);

      if (guestBook == null) {
        return new ResponseEntity<>(guestBookNo, HttpStatus.NOT_FOUND);
      }

      guestBookService.unlike(loginUser, guestBook);
      return new ResponseEntity<>(guestBookNo, HttpStatus.OK);
    } catch (Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(guestBookNo, HttpStatus.BAD_REQUEST);
    }
  }


  @GetMapping("/likedGuestBooks")
  public ResponseEntity<List<Integer>> getLikedGuestBooks(HttpSession session) {
    try {
      Member loginUser = (Member) session.getAttribute("loginUser");
      if (loginUser == null) {
        // 로그인되지 않은 경우
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
      }

      List<Integer> likedGuestBooks = guestBookService.likelist(loginUser.getNo());
      return new ResponseEntity<>(likedGuestBooks, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
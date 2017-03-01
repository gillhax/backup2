//package quiz.web.rest;
//
//import com.codahale.metrics.annotation.Timed;
//import java.util.Collections;
//import javax.inject.Inject;
//import javax.servlet.http.HttpServletResponse;
//import javax.validation.Valid;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import quiz.security.jwt.TokenProvider;
//import quiz.service.dto.LoginVM;
//import springfox.documentation.annotations.ApiIgnore;
//
//@RestController
//@ApiIgnore
//@RequestMapping({"/api"})
//public class UserJWTController {
//   @Inject
//   private TokenProvider tokenProvider;
//   @Inject
//   private AuthenticationManager authenticationManager;
//
//   @PostMapping({"/authenticate"})
//   @Timed
//   public ResponseEntity authorize(@Valid @RequestBody LoginVM loginVM, HttpServletResponse response) {
//      UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginVM.getLogin(), loginVM.getPassword());
//
////      try {
////         Authentication exception = this.authenticationManager.authenticate(authenticationToken);
////         SecurityContextHolder.getContext().setAuthentication(exception);
////         boolean rememberMe = loginVM.getRememberMe() == null?false:loginVM.getRememberMe().booleanValue();
////         String jwt = this.tokenProvider.createToken(exception, Boolean.valueOf(rememberMe));
////         response.addHeader("Authorization", "Bearer " + jwt);
////         return ResponseEntity.ok(new JWTToken(jwt));
////      } catch (AuthenticationException var7) {
////         return new ResponseEntity(Collections.singletonMap("AuthenticationException", var7.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
////      }
//       return null;
//   }
//}

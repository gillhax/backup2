package quiz.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import quiz.service.SecurityService;
import quiz.service.dto.LoginVM;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Collections;

@RestController
@ApiIgnore
@RequestMapping({"/api"})
public class UserTokenController {

    private final SecurityService securityService;

    public UserTokenController(SecurityService securityService) {
        this.securityService = securityService;
    }

    @PostMapping({"/authenticate"})
    @Timed
    public ResponseEntity authenticate(@Valid @RequestBody LoginVM loginVM, HttpServletResponse response) {
        try {
            String token = securityService.login(loginVM).getToken();
            response.addHeader("Authorization", token);
            return ResponseEntity.ok(new JWTToken(token));
        } catch (AuthenticationException var7) {
            return new ResponseEntity(Collections.singletonMap("AuthenticationException", var7.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
        }


    }
}

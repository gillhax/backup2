package quiz.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.Api;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;
import quiz.domain.User;
import quiz.repository.UserRepository;
import quiz.service.MailService;
import quiz.service.SecurityService;
import quiz.service.UserService;
import quiz.service.dto.LoginVM;
import quiz.system.error.ApiAssert;
import quiz.system.error.handler.dto.ResponseDto;
import quiz.web.rest.vm.KeyAndPasswordVM;
import quiz.web.rest.vm.ManagedCreateUserVM;

import javax.validation.Valid;
import java.beans.ConstructorProperties;
import java.util.Optional;

import static quiz.system.util.StaticWrapper.wrap;

@RestController
@RequestMapping({"/api/v1/"})
@Api(
    tags = {"Account"}
)
public class AccountController {

    private final SecurityService securityService;

    private final UserService userService;

    private final UserRepository userRepository;


    private final MailService mailService;


    public AccountController(SecurityService securityService, UserService userService,
                             UserRepository userRepository, MailService mailService) {
        this.securityService = securityService;
        this.userService = userService;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @PostMapping(
        path = {"/account/register"},
        produces = {"application/json", "text/plain"}
    )
    @Timed
    public ResponseDto registerAccount(@Valid @RequestBody ManagedCreateUserVM managedCreateUserVM) {
        Optional user = this.userRepository.findOneByLogin(managedCreateUserVM.getLogin().toLowerCase());
        ApiAssert.badRequest(user.isPresent(), "login.email.exist");
        this.userService.createUser(managedCreateUserVM);
        return wrap();
    }

    @PostMapping({"/account/authenticate"})
    @Timed
    public ResponseDto authenticate(@Valid @RequestBody LoginVM loginVM) {
        return wrap(securityService.login(loginVM));

    }

    @GetMapping(
        path = {"/account/reset/password/init"}
    )
    @Timed
    public ResponseDto requestPasswordReset(@RequestParam String mail) {
        Optional user = this.userService.requestPasswordReset(mail);
        ApiAssert.badRequest(!user.isPresent(), "not-found.reset.email");
        this.mailService.sendPasswordResetMail((User) user.get());
        return wrap();
    }

    @PostMapping(
        path = {"/account/reset/password/finish"}
    )
    @Timed
    public ResponseDto finishPasswordReset(@RequestBody KeyAndPasswordVM keyAndPassword) {
        if (!this.checkPasswordLength(keyAndPassword.getNewPassword())) {
            ApiAssert.unprocessable(true, "Пароль не удовлетворяет условиям");
        }

        Optional user = this.userService.completePasswordReset(keyAndPassword.getNewPassword(), keyAndPassword.getKey());
        ApiAssert.badRequest(!user.isPresent(), "Введённый ключ не верный");
        return wrap();
    }

    @GetMapping(
        path = {"/account/reset/password/key"}
    )
    @Timed
    public ResponseDto checkKeyPasswordReset(@RequestParam String key) {
        Boolean valid = this.userService.checkResetKey(key);
        return wrap(new AccountController.checked(valid.booleanValue()));
    }

    private boolean checkPasswordLength(String password) {
        return !StringUtils.isEmpty(password) && password.length() >= 4 && password.length() <= 100;
    }

    private class checked {
        private boolean valid;

        public boolean isValid() {
            return this.valid;
        }

        public void setValid(boolean valid) {
            this.valid = valid;
        }

        @ConstructorProperties({"valid"})
        public checked(boolean valid) {
            this.valid = valid;
        }
    }
}

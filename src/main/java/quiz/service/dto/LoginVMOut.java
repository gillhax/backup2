package quiz.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LoginVMOut {

    @NotNull
    String token;

    public LoginVMOut(String token) {
        this.token = token;
    }
}

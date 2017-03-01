package quiz.service;

import quiz.service.dto.LoginVM;
import quiz.service.dto.LoginVMOut;

public interface SecurityService {

    LoginVMOut login(LoginVM loginVM);

}

package quiz.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.domain.SecurityToken;
import quiz.domain.User;
import quiz.repository.SecurityTokenRepository;
import quiz.repository.UserRepository;
import quiz.service.dto.LoginVM;
import quiz.service.dto.LoginVMOut;
import quiz.service.security.TokenGenerator;
import quiz.system.error.exception.SecurityUserException;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(rollbackFor = Throwable.class)
public class SecurityServiceImpl implements SecurityService {

    private final TokenGenerator tokenGenerator;

    private final UserRepository userRepository;

    private final SecurityTokenRepository securityTokenRepository;

    @Value("${project.security.access-token.max-count:}")
    private int accessTokeMaxCount;

    public SecurityServiceImpl(TokenGenerator tokenGenerator, UserRepository userRepository, SecurityTokenRepository securityTokenRepository) {
        this.tokenGenerator = tokenGenerator;
        this.userRepository = userRepository;
        this.securityTokenRepository = securityTokenRepository;
    }

    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @Override
    public LoginVMOut login(LoginVM loginVM) {
        Optional<User> user = userRepository.findOneByLogin(loginVM.getLogin());
        if (!user.isPresent() ||
            !bCryptPasswordEncoder.matches(loginVM.getPassword(), user.get().getPassword())) {
            throw new SecurityUserException("security.login.incorrect");
        }

        //check is disabled
        if (!user.get().isActivated()) {
            throw new SecurityUserException("security.blocked");
        }

        if (user.get().getSecurityTokens().size() >= accessTokeMaxCount) {
            List<SecurityToken> securityTokens = user.get().getSecurityTokens();
            for (int i = accessTokeMaxCount - 1; i < securityTokens.size(); i++) {
                securityTokenRepository.delete(securityTokens.get(i));
            }
        }

        String accessToken = addNewTokenForUser(user.get());

        return new LoginVMOut(accessToken);
    }

    private String addNewTokenForUser(User user) {
        String accessToken = tokenGenerator.generateAccessToken();
        SecurityToken securityToken = new SecurityToken();
        securityToken.setUser(user);
        securityToken.setToken(accessToken);
        securityTokenRepository.save(securityToken);
        return accessToken;
    }

}

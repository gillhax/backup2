package quiz.config.security;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import quiz.domain.SecurityToken;
import quiz.domain.User;
import quiz.repository.SecurityTokenRepository;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Authenticate a user from the database.
 */
@Component
class TokenAuthenticationManager implements AuthenticationManager {

    private final SecurityTokenRepository tokenRepository;

    private Cache<String, UserForCache> userCache = CacheBuilder.newBuilder()
        .maximumSize(10000)
        .expireAfterAccess(1, TimeUnit.MINUTES)
        .build();

    TokenAuthenticationManager(SecurityTokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    @Override
    @Transactional
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String token = (String) authentication.getCredentials();

        User user;
        List<GrantedAuthority> grantedAuthorities;

        UserForCache userFromCache = userCache.getIfPresent(token);

        if (userFromCache != null) {
            user = userFromCache.getUser();
            grantedAuthorities = userFromCache.getAuthorities();
        } else {
            SecurityToken securityToken = tokenRepository.findOneByToken(token);
            if (securityToken == null) {
                throw new BadCredentialsException("Invalid token");
            }
            user = securityToken.getUser();
            grantedAuthorities = user.getAuthorities()
                .stream()
                .map(securityRole -> new SimpleGrantedAuthority(securityRole.getName()))
                .collect(Collectors.toList());
            userCache.put(token, new UserForCache(user, grantedAuthorities));
        }

        return new UsernamePasswordAuthenticationToken(user, token, grantedAuthorities);
    }

    @Getter
    @AllArgsConstructor
    private static class UserForCache {
        private User user;
        private List<GrantedAuthority> authorities;
    }
}

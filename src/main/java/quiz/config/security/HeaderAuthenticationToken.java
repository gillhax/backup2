package quiz.config.security;

import com.sun.istack.internal.NotNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;

class HeaderAuthenticationToken extends AbstractAuthenticationToken {

    private String token;

    HeaderAuthenticationToken(@NotNull String token) {
        super(null);
        this.token = token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        HeaderAuthenticationToken that = (HeaderAuthenticationToken) o;

        return token.equals(that.token);
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + token.hashCode();
        return result;
    }
}

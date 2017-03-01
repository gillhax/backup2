package quiz.service.security;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import quiz.system.util.StringGenerator;

@Component
public class TokenGenerator {
    @Value("${project.security.access-token.length}")
    private int tokenLength;

    @Value("${project.security.access-token.symbols}")
    private char[] symbols;

    public String generateAccessToken() {
        return StringGenerator.generate(tokenLength, symbols);
    }

}

package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import quiz.domain.SecurityToken;

@Repository
@Transactional(propagation = Propagation.MANDATORY)
public interface SecurityTokenRepository extends JpaRepository<SecurityToken, Long> {

    SecurityToken findOneByToken(String token);
}

package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.domain.Authority;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}

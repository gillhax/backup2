package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.domain.Help;

@Repository
public interface HelpRepository extends JpaRepository<Help, Long> {
}

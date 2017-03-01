package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.domain.Question;
import quiz.domain.Version;

import java.util.Optional;

/**
 * Spring Data JPA repository for the Question entity.
 */
@SuppressWarnings("unused")
public interface VersionRepository extends JpaRepository<Version, Integer> {

}

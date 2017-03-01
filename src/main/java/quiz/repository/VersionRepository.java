package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.domain.Version;

public interface VersionRepository extends JpaRepository<Version, Integer> {
}

package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.domain.MediaContainer;

public interface MediaContainerRepository extends JpaRepository<MediaContainer, Long> {
}

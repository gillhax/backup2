package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.domain.Avatar;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Integer> {
}

package quiz.repository;

import quiz.domain.Avatar;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Avatar entity.
 */
@SuppressWarnings("unused")
public interface AvatarRepository extends JpaRepository<Avatar,Integer> {

}

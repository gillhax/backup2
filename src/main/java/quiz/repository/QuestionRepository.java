package quiz.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.domain.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {

    Optional<Question> findOneByTitle(String title);

}

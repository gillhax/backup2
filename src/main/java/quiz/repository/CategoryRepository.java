package quiz.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import quiz.domain.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    //left join fetch c.subcategories subc
    //left join subc.questions quest
    @Query(value = "from Category c ")
    List<Category> findAllEager();
}

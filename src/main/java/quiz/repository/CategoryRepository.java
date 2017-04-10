package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import quiz.domain.Category;

import java.util.List;

@Repository
@Transactional
public interface CategoryRepository extends JpaRepository<Category,Long> {

    //left join fetch c.subcategories subc
    //left join subc.questions quest
    @Query("select c from Category c")
    List<Category> findAllEager();
}

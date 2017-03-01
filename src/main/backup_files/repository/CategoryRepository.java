package quiz.repository;

import quiz.domain.Category;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Category entity.
 */
@SuppressWarnings("unused")
public interface CategoryRepository extends JpaRepository<Category,Long> {

    //left join subc.questions quest
        @Query(value = "from Category c left join fetch c.subcategories subc")
    List<Category> findAllEager();
}

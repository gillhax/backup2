package quiz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import quiz.domain.OfferTradition;

/**
 * Spring Data JPA repository for the Avatar entity.
 */
@SuppressWarnings("unused")
public interface OfferTraditionRepository extends JpaRepository<OfferTradition, Long> {

//    @EntityGraph(value = "OfferTradition.images", type = EntityGraph.EntityGraphType.LOAD)
//    Page<OfferTradition> findAll(Pageable pageable);
}

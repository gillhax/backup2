package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.domain.OfferTradition;

@Repository
public interface OfferTraditionRepository extends JpaRepository<OfferTradition, Long> {
}

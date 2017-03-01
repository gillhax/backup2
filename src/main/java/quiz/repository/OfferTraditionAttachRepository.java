package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import quiz.domain.OfferTraditionAttach;

@Repository
public interface OfferTraditionAttachRepository extends JpaRepository<OfferTraditionAttach, Long> {
}

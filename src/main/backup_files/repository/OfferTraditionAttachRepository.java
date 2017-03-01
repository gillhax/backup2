package quiz.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quiz.domain.OfferTraditionAttach;

/**
 * Spring Data JPA repository for the Avatar entity.
 */
@SuppressWarnings("unused")
public interface OfferTraditionAttachRepository extends JpaRepository<OfferTraditionAttach, Long> {

}

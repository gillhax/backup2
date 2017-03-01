package quiz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import quiz.domain.Player;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Player entity.
 */

@Repository
@Transactional
public interface PlayerRepository extends JpaRepository<Player,Long> {

    @Query(value = "from Player p order by p.score DESC")
    List<Player> findOrderByScore(Pageable pageable);

    @Query(value = "SELECT find_player_position(:userId)", nativeQuery = true)
    Long findPlayerPosition(@Param("userId") Long userId);


}

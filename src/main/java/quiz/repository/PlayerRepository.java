package quiz.repository;

import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import quiz.domain.Player;

@Repository
@Transactional
public interface PlayerRepository extends JpaRepository<Player,Long> {

    @Query(value = "from Player p order by p.score DESC")
    List<Player> findOrderByScore(Pageable pageable);

    @Query(value = "SELECT find_player_position(:userId)", nativeQuery = true)
    Long findPlayerPosition(@Param("userId") Long userId);
}

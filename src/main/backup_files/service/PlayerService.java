package quiz.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import quiz.converter.PlayerConverter;
import quiz.domain.Avatar;
import quiz.domain.Player;
import quiz.repository.AvatarRepository;
import quiz.repository.PlayerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import quiz.service.dto.PlayerDtoIn;
import quiz.service.dto.PlayerDtoOut;
import quiz.system.error.ApiAssert;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service Implementation for managing Player.
 */
@Service
public class PlayerService {

    private final Logger log = LoggerFactory.getLogger(PlayerService.class);

    @Inject
    private PlayerRepository playerRepository;

    @Inject
    private PlayerConverter playerConverter;

    @Inject
    private AvatarRepository avatarRepository;


    /**
     * Save a player.
     *
     * @param player the entity to save
     * @return the persisted entity
     */
    public Player create(Player player) {
        Player result = playerRepository.save(player);
        return result;
    }

    public Player update(Player player) {
        if (player.getId() != null) {
            return playerRepository.save(player);
        }
        return null;
    }


    /**
     * Get all the players.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Player> findAll(Pageable pageable) {
        log.debug("Request to get all Players");
        Page<Player> result = playerRepository.findAll(pageable);
        return result;
    }

    /**
     * Get one player by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Player findOne(Long id) {
        log.debug("Request to get Player : {}", id);
        Player player = playerRepository.findOne(id);
        ApiAssert.notFound(player == null, "not-found");
        return player;
    }

    /**
     * Delete the  player by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Player : {}", id);
        playerRepository.delete(id);
    }


    public PlayerDtoOut getPlayerById(Long id) {
        Player player = playerRepository.findOne(id);
        ApiAssert.notFound(player == null, "not-found.player");
        return playerConverter.toDTO(player);
    }


    public PlayerDtoOut updatePlayer(Long userId, PlayerDtoIn playerDtoIn) {
        Player player = playerRepository.findOne(userId);
        ApiAssert.notFound(player == null, "not-found.player");
        //set avatar
        if (playerDtoIn.getAvatarId() != null) {
            Avatar avatar = avatarRepository.findOne(playerDtoIn.getAvatarId());
            ApiAssert.notFound(avatar == null, "not-found.avatar");
            player.setAvatar(avatar);
        }
        if (playerDtoIn.getName() != null) {
            player.setName(playerDtoIn.getName());
        }
        Player savedPlayer = playerRepository.save(player);
        return playerConverter.toDTO(savedPlayer);
    }

    public Map<Object, List> getPlayersTop(Long userId) {
        Pageable pageable = new PageRequest(0, 100);
        List<Player> players = playerRepository.findOrderByScore(pageable);
        List<PlayerDtoOut> playersDto = playerConverter.toDTOs(players);
        Long playerPosition = playerRepository.findPlayerPosition(userId);
        Map result = new HashMap<>();
        result.put("position", playerPosition);
        result.put("players", playersDto);
        return result;
    }

    public Long getProfileScore(Long id) {
        Player player = playerRepository.findOne(id);
        ApiAssert.notFound(player == null, "not-found.player");
        return player.getScore();
    }

}

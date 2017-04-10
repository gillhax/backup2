package quiz.converter;

import org.springframework.stereotype.Component;
import quiz.domain.Player;
import quiz.service.dto.PlayerDtoIn;
import quiz.service.dto.PlayerDtoOut;

@Component
public class PlayerConverter extends Converter2Args<Player, PlayerDtoIn, PlayerDtoOut> {

    private final AvatarConverter avatarConverter;

    public PlayerConverter(AvatarConverter avatarConverter) {
        this.avatarConverter = avatarConverter;
    }

    public PlayerDtoOut toDTO(Player player) {
        if (player == null) {
            return null;
        } else {
            PlayerDtoOut playerDto = new PlayerDtoOut();
            playerDto.setAvatar(this.avatarConverter.toDTO(player.getAvatar()));
            playerDto.setName(player.getName());
            playerDto.setVersion(player.getVersion().getTime());
            playerDto.setScore(player.getScore());
            playerDto.setId(player.getId());
            return playerDto;
        }
    }
}

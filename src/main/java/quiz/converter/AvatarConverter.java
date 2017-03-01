package quiz.converter;

import org.springframework.stereotype.Component;
import quiz.domain.Avatar;
import quiz.service.dto.AvatarDto;

@Component
public class AvatarConverter extends Converter<Avatar, AvatarDto> {
   public AvatarDto toDTO(Avatar avatar) {
      if(avatar == null) {
         return null;
      } else {
         AvatarDto avatarDto = new AvatarDto();
         avatarDto.setPath(avatar.getPath());
         avatarDto.setId(avatar.getId());
         return avatarDto;
      }
   }
}

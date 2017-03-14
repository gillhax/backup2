package quiz.service.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.domain.Avatar;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvatarAdminDto extends Avatar {

    String file;
}

package quiz.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.domain.Player;

import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDtoIn {

    @Size(min = 1, max = 64)
    String name;

    Integer avatarId;

}

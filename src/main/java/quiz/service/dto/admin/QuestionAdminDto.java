package quiz.service.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.domain.Question;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionAdminDto extends Question {

    String file;

    Boolean removeMedia;

}

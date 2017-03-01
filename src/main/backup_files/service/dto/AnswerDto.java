package quiz.service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerDto {

    @Size(min = 1, max = 64)
    String title;

    boolean right = false;

    public AnswerDto(String answer) {
        this.title = answer;
    }
}



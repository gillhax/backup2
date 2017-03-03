package quiz.service.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.domain.util.ImageUrlJsonSerializer;

import javax.validation.constraints.Size;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HelpDto {

    Integer id;

    @JsonSerialize(using = ImageUrlJsonSerializer.class)
    @Size(
        min = 1,
        max = 512)
    String path;

}

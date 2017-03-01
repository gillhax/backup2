package quiz.service.dto;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import quiz.domain.util.ImageUrlJsonSerializer;

import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvatarDto {

    Integer id;

    @Size(min = 1, max = 512)
    @JsonSerialize(using = ImageUrlJsonSerializer.class)
    String path;
}



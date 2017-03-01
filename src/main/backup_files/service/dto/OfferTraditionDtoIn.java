package quiz.service.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OfferTraditionDtoIn {

    @NotNull
    @Min(1)
    @Max(5120)
    @ApiModelProperty(required = true)
    String text;

    //@NotBlank
    //5 mb in base 64
    @ApiModelProperty(notes = "Base64 jpeg or png file. max 2048px (by height or width) and 5 MiB")
    @Length(max = (5 * 1024 * 1024) * 4)
    List<String> base64Images;

}



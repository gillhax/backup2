package quiz.service.dto;

import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.beans.ConstructorProperties;
import java.util.List;

public class OfferTraditionDtoIn {
   @NotNull
   @Min(1)
   @Max(5120)
   @ApiModelProperty(required = true)
   String text;

    @ApiModelProperty(notes = "Base64 jpeg or png file. max 2048px (by height or width) and 5 MiB")
    @Length(max = 20971520)
    List<String> base64Images;

   public String getText() {
      return this.text;
   }

    public List<String> getBase64Images() {
      return this.base64Images;
   }

   public void setText(String text) {
      this.text = text;
   }

   public void setBase64Images(List base64Images) {
      this.base64Images = base64Images;
   }

   public OfferTraditionDtoIn() {
   }

   @ConstructorProperties({"text", "base64Images"})
   public OfferTraditionDtoIn(String text, List base64Images) {
      this.text = text;
      this.base64Images = base64Images;
   }
}

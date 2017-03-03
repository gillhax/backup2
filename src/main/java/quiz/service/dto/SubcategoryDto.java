package quiz.service.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.beans.ConstructorProperties;
import java.util.List;

public class SubcategoryDto {
   Long id;
    @Min(1)
    @Max(64)
   String name;
    List<QuestionDto> questions;

   public Long getId() {
      return this.id;
   }

   public String getName() {
      return this.name;
   }

   public List getQuestions() {
      return this.questions;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public void setName(String name) {
      this.name = name;
   }

   public void setQuestions(List questions) {
      this.questions = questions;
   }

   public SubcategoryDto() {
   }

   @ConstructorProperties({"id", "name", "questions"})
   public SubcategoryDto(Long id, String name, List questions) {
      this.id = id;
      this.name = name;
      this.questions = questions;
   }
}

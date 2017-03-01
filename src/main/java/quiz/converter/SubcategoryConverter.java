package quiz.converter;

import org.springframework.stereotype.Component;
import quiz.domain.Subcategory;
import quiz.service.dto.SubcategoryDto;

@Component
public class SubcategoryConverter extends Converter<Subcategory, SubcategoryDto> {

    private final QuestionConverter questionConverter;

    public SubcategoryConverter(QuestionConverter questionConverter) {
        this.questionConverter = questionConverter;
    }

    public SubcategoryDto toDTO(Subcategory subcategory) {
      if(subcategory == null) {
         return null;
      } else {
         SubcategoryDto subcategoryDto = new SubcategoryDto();
         subcategoryDto.setId(subcategory.getId());
         subcategoryDto.setName(subcategory.getName());
          subcategoryDto.setQuestions(questionConverter.toDTOs(subcategory.getQuestions()));
         return subcategoryDto;
      }
   }
}

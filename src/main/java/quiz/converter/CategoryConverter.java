package quiz.converter;

import org.springframework.stereotype.Component;
import quiz.domain.Category;
import quiz.service.dto.CategoryDto;

@Component
public class CategoryConverter extends Converter<Category, CategoryDto> {

    private final SubcategoryConverter subcategoryConverter;

    public CategoryConverter(SubcategoryConverter subcategoryConverter) {
        this.subcategoryConverter = subcategoryConverter;
    }

    public CategoryDto toDTO(Category category) {
      if(category == null) {
         return null;
      } else {
         CategoryDto categoryDto = new CategoryDto();
         categoryDto.setId(category.getId());
         categoryDto.setName(category.getName());
          categoryDto.setSubcategories(subcategoryConverter.toDTOs(category.getSubcategories()));
         return categoryDto;
      }
   }
}

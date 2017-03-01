package quiz.service.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.beans.ConstructorProperties;
import java.util.List;

@Getter
@Setter
public class CategoryDto {
    Long id;
    @Min(1L)
    @Max(64L)
    String name;
    List<SubcategoryDto> subcategories;

    public CategoryDto() {
    }

    @ConstructorProperties({"id", "name", "subcategories"})
    public CategoryDto(Long id, String name, List subcategories) {
        this.id = id;
        this.name = name;
        this.subcategories = subcategories;
    }
}

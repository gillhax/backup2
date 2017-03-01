package quiz.converter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public abstract class Converter<Entity, DTO> {

    public Entity toEntity(DTO dto) {
        throw new UnsupportedOperationException();
    }

    public DTO toDTO(Entity entity) {
        throw new UnsupportedOperationException();
    }

    public List<Entity> toEntities(List<DTO> dtoList) {
        if (dtoList == null) {
            return Collections.emptyList();
        }

        List<Entity> entityList = new ArrayList<>(dtoList.size());
        for (DTO dto : dtoList) {
            entityList.add(toEntity(dto));
        }

        return entityList;
    }

    public List<DTO> toDTOs(List<Entity> entityList) {
        if (entityList == null) {
            return Collections.emptyList();
        }

        List<DTO> dtoList = new ArrayList<>(entityList.size());
        for (Entity entity : entityList) {
            dtoList.add(toDTO(entity));
        }

        return dtoList;
    }

}


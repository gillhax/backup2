package quiz.converter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public abstract class Converter2Args<Entity, DTOin, DTOout> {
    public Entity toEntity(DTOin dto) {
        throw new UnsupportedOperationException();
    }

    public DTOout toDTO(Entity entity) {
        throw new UnsupportedOperationException();
    }

    public List<Entity> toEntities(List<DTOin> dtoList) {
        if (dtoList == null) {
            return Collections.emptyList();
        }

        List<Entity> entityList = new ArrayList<>(dtoList.size());
        for (DTOin dto : dtoList) {
            entityList.add(toEntity(dto));
        }

        return entityList;
    }

    public List<DTOout> toDTOs(List<Entity> entityList) {
        if (entityList == null) {
            return Collections.emptyList();
        }

        List<DTOout> dtoList = new ArrayList<>(entityList.size());
        for (Entity entity : entityList) {
            dtoList.add(toDTO(entity));
        }

        return dtoList;
    }

}

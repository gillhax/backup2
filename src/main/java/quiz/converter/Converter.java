package quiz.converter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public abstract class Converter {
   public Object toEntity(Object dto) {
      throw new UnsupportedOperationException();
   }

   public Object toDTO(Object entity) {
      throw new UnsupportedOperationException();
   }

   public List toEntities(List dtoList) {
      if(dtoList == null) {
         return Collections.emptyList();
      } else {
         ArrayList entityList = new ArrayList(dtoList.size());
         Iterator var3 = dtoList.iterator();

         while(var3.hasNext()) {
            Object dto = var3.next();
            entityList.add(this.toEntity(dto));
         }

         return entityList;
      }
   }

   public List toDTOs(List entityList) {
      if(entityList == null) {
         return Collections.emptyList();
      } else {
         ArrayList dtoList = new ArrayList(entityList.size());
         Iterator var3 = entityList.iterator();

         while(var3.hasNext()) {
            Object entity = var3.next();
            dtoList.add(this.toDTO(entity));
         }

         return dtoList;
      }
   }

   public Set toDTOs(Set entityList) {
      if(entityList == null) {
         return Collections.emptySet();
      } else {
         HashSet dtoSet = new HashSet(entityList.size());
         Iterator var3 = entityList.iterator();

         while(var3.hasNext()) {
            Object entity = var3.next();
            dtoSet.add(this.toDTO(entity));
         }

         return dtoSet;
      }
   }
}

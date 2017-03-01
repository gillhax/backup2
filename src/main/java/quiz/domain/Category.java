package quiz.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.beans.ConstructorProperties;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@Table(
   name = "category"
)
@Cache(
   usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE
)
public class Category implements Serializable {
   private static final long serialVersionUID = 1L;
   @Id
   @GeneratedValue(
      strategy = GenerationType.AUTO
   )
   private Long id;
   @NotNull
   @Size(
      min = 1,
      max = 64
   )
   @Column(
      name = "name",
      length = 64,
      nullable = false
   )
   private String name;
   @OneToMany(
      mappedBy = "category",
      fetch = FetchType.LAZY
   )
   private List<Subcategory> subcategories;

   public boolean equals(Object o) {
      if(this == o) {
         return true;
      } else if(o != null && this.getClass() == o.getClass()) {
         Category category = (Category)o;
          return (category.id != null && id != null) && Objects.equals(id, category.id);
      } else {
         return false;
      }
   }

   public int hashCode() {
      return Objects.hashCode(this.id);
   }

   public String toString() {
      return "Category{id=" + this.id + ", name=\'" + this.name + "\'" + '}';
   }


   @ConstructorProperties({"id", "name", "subcategories"})
   public Category(Long id, String name, List<Subcategory> subcategories) {
      this.id = id;
      this.name = name;
      this.subcategories = subcategories;
   }

   public Category() {
   }
}

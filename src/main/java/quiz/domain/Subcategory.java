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
   name = "subcategory"
)
@Cache(
   usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE
)
public class Subcategory implements Serializable {
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
   @ManyToOne(
      targetEntity = Category.class
   )
   @NotNull
   private Category category;
   @OneToMany(
      mappedBy = "subcategory",
      fetch = FetchType.LAZY,
      targetEntity = Question.class
   )
   private List<Question> questions;

   public boolean equals(Object o) {
      if(this == o) {
         return true;
      } else if(o != null && this.getClass() == o.getClass()) {
         Subcategory subcategory = (Subcategory)o;
          return (subcategory.id != null && this.id != null) && Objects.equals(this.id, subcategory.id);
      } else {
         return false;
      }
   }

   public int hashCode() {
      return Objects.hashCode(this.id);
   }

   public String toString() {
      return "Subcategory{id=" + this.id + ", name=\'" + this.name + "\'" + '}';
   }


   @ConstructorProperties({"id", "name", "category", "questions"})
   public Subcategory(Long id, String name, Category category, List<Question> questions) {
      this.id = id;
      this.name = name;
      this.category = category;
      this.questions = questions;
   }

   public Subcategory() {
   }
}

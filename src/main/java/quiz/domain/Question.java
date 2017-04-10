package quiz.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Getter
@Setter
@Table(
   name = "question"
)
@Cache(
   usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE
)
public class Question implements Serializable {
   private static final long serialVersionUID = 1L;
   @Id
   @GeneratedValue(
      strategy = GenerationType.AUTO
   )
   private Long id;
    @Column(name = "version")
   private Timestamp version;

   @NotNull
   @Size(
      min = 1,
      max = 255
   )
   @Column(
      name = "title",
      length = 255,
      nullable = false
   )
   private String title;

    @ManyToOne(
      targetEntity = MediaContainer.class
   )
   @JoinColumn(
      name = "media_id"
   )
   private MediaContainer media;
   @NotNull
   @Size(
      min = 1,
      max = 64
   )
   @Column(
      name = "answer_1",
      length = 64,
      nullable = false
   )
   private String answer1;
   @NotNull
   @Size(
      min = 1,
      max = 64
   )
   @Column(
      name = "answer_2",
      length = 64,
      nullable = false
   )
   private String answer2;
   @NotNull
   @Size(
      min = 1,
      max = 64
   )
   @Column(
      name = "answer_3",
      length = 64,
      nullable = false
   )
   private String answer3;
   @NotNull
   @Size(
      min = 1,
      max = 64
   )
   @Column(
      name = "answer_4",
      length = 64,
      nullable = false
   )
   private String answer4;
    @Min(1)
    @Max(4)
   @NotNull
   @Column(
      name = "right_answer",
      nullable = false
   )
   private Integer rightAnswer;
   @ManyToOne(
      targetEntity = Subcategory.class
   )
   @NotNull
   @JoinColumn(name = "subcategory_id")
   private Subcategory subcategory;


    public int hashCode() {
      return Objects.hashCode(this.id);
   }

   public String toString() {
      return "Question{id=" + this.id + ", version=\'" + this.version + "\', title=\'" + this.title + "\', answer1=\'" + this.answer1 + "\', answer2=\'" + this.answer2 + "\', answer3=\'" + this.answer3 + "\', answer4=\'" + this.answer4 + "\', rightAnswer=\'" + this.rightAnswer + "\'" + '}';
   }

}

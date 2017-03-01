package quiz.domain;

import liquibase.datatype.core.TimestampType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Objects;

/**
 * A Question.
 */
@Getter
@Setter
@Entity
@Table(name = "question")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "version")
    private Timestamp version;

    @NotNull
    @Size(min = 1, max = 255)
    @Column(name = "title", length = 255, unique = true, nullable = false)
    private String title;

    @Size(min = 0, max = 20)
    @Column(name = "media_type", length = 20)
    private String mediaType;

    @Size(min = 0, max = 512)
    @Column(name = "media", length = 512)
    private String media;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "answer_1", length = 64, nullable = false)
    private String answer1;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "answer_2", length = 64, nullable = false)
    private String answer2;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "answer_3", length = 64, nullable = false)
    private String answer3;

    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "answer_4", length = 64, nullable = false)
    private String answer4;

    @Min(1)
    @Max(4)
    @NotNull
    @Column(name = "right_answer", nullable = false)
    private Integer rightAnswer;

    @ManyToOne(targetEntity = Subcategory.class)
    @NotNull
    @JoinColumn(name = "subcategory_id")
    private Subcategory subcategory;


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Question question = (Question) o;
        if (question.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, question.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Question{" +
            "id=" + id +
            ", version='" + version + "'" +
            ", title='" + title + "'" +
            ", mediaType='" + mediaType + "'" +
            ", media='" + media + "'" +
            ", answer1='" + answer1 + "'" +
            ", answer2='" + answer2 + "'" +
            ", answer3='" + answer3 + "'" +
            ", answer4='" + answer4 + "'" +
            ", rightAnswer='" + rightAnswer + "'" +
            '}';
    }
}

package quiz.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @JsonIgnore
    @OneToMany(mappedBy = "subcategory", fetch = FetchType.LAZY, targetEntity = Question.class)
    private List<Question> questions;

    public boolean equals(Object o) {
        if (this == o) {
            return true;
        } else if (o != null && this.getClass() == o.getClass()) {
            Subcategory subcategory = (Subcategory) o;
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


}

package quiz.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import quiz.domain.util.ImageUrlJsonSerializer;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Entity
@Table(
    name = "help"
)
@Cache(
    usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE
)
public class Help implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(
        strategy = GenerationType.AUTO
    )
    private Long id;
    @NotNull
    @Size(
        min = 1,
        max = 128
    )
    @Column(
        name = "title",
        length = 128,
        nullable = false
    )
    private String title;
    @NotNull
    @Size(
        min = 1,
        max = 2560
    )
    @Column(
        name = "description",
        length = 2560,
        nullable = false
    )
    private String description;
    @Size(
        min = 0,
        max = 512
    )
    @Column(
        name = "image",
        length = 512
    )
    @JsonSerialize(using = ImageUrlJsonSerializer.class)
    private String image;

    public void setImage(String image) {
        this.image = image;
    }

    public boolean equals(Object o) {
        if(this == o) {
            return true;
        } else if(o != null && this.getClass() == o.getClass()) {
            Help help = (Help)o;
            return help.id != null && this.id != null?Objects.equals(this.id, help.id):false;
        } else {
            return false;
        }
    }

    public int hashCode() {
        return Objects.hashCode(this.id);
    }

    public String toString() {
        return "Help{id=" + this.id + ", title=\'" + this.title + "\', description=\'" + this.description + "\', image=\'" + this.image + "\'" + '}';
    }
}

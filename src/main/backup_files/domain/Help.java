package quiz.domain;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import quiz.domain.util.ImageUrlJsonSerializer;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Help.
 */
@Entity
@Table(name = "help")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Help implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 128)
    @Column(name = "title", length = 128, nullable = false)
    private String title;

    @NotNull
    @Size(min = 1, max = 2560)
    @Column(name = "description", length = 2560, nullable = false)
    private String description;

    @Size(min = 0, max = 512)
    @Column(name = "image", length = 512)
    @JsonSerialize(using = ImageUrlJsonSerializer.class)
    private String image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Help title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public Help description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public Help image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Help help = (Help) o;
        if (help.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, help.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Help{" +
            "id=" + id +
            ", title='" + title + "'" +
            ", description='" + description + "'" +
            ", image='" + image + "'" +
            '}';
    }
}

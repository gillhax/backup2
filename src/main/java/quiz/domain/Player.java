package quiz.domain;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(
   name = "player"
)
@Cache(
   usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE
)
@Getter
@Setter
public class Player implements Serializable {
   private static final long serialVersionUID = 1L;
   @OneToOne(
      fetch = FetchType.LAZY,
      optional = false
   )
   @PrimaryKeyJoinColumn
   @JsonIgnore
   private User user;
   @Id
   private Long id;
   @Size(
      min = 1,
      max = 64
   )
   @Column(
      name = "name",
      length = 64
   )
   private String name;
   @Column(
      name = "score"
   )
   private Long score;
   @ManyToOne
   private Avatar avatar;

    @Column(name = "version")
    private Timestamp version;

   public boolean equals(Object o) {
      if(this == o) {
         return true;
      } else if(o != null && this.getClass() == o.getClass()) {
         Player player = (Player)o;
         return player.id != null && this.id != null?Objects.equals(this.id, player.id):false;
      } else {
         return false;
      }
   }

   public int hashCode() {
      return Objects.hashCode(this.id);
   }

}

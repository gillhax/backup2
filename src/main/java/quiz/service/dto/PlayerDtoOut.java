package quiz.service.dto;

import javax.validation.constraints.Size;
import java.beans.ConstructorProperties;

public class PlayerDtoOut {
   Long id;
   @Size(
      min = 1,
      max = 64
   )
   String name;

   Long score;

   AvatarDto avatar;

    long version;

   public Long getId() {
      return this.id;
   }

   public String getName() {
      return this.name;
   }

   public Long getScore() {
      return this.score;
   }

   public AvatarDto getAvatar() {
      return this.avatar;
   }

   public void setId(Long id) {
      this.id = id;
   }

   public void setName(String name) {
      this.name = name;
   }

   public void setScore(Long score) {
      this.score = score;
   }

   public void setAvatar(AvatarDto avatar) {
      this.avatar = avatar;
   }

    public void setVersion(long version) {
        this.version = version;
    }

    public long getVersion() {
        return this.version;
    }

    public PlayerDtoOut() {
   }

   @ConstructorProperties({"id", "name", "score", "avatar"})
   public PlayerDtoOut(Long id, String name, Long score, AvatarDto avatar) {
      this.id = id;
      this.name = name;
      this.score = score;
      this.avatar = avatar;
   }
}

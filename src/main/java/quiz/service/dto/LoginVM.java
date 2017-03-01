package quiz.service.dto;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class LoginVM {
   @Pattern(
      regexp = "^[_\'.@A-Za-z0-9-]*$"
   )
   @NotNull
   @Size(
      min = 1,
      max = 50
   )
   private String login;
   @NotNull
   @Size(
      min = 4,
      max = 100
   )
   private String password;

   public String toString() {
       return "LoginVM{password=\'*****\', login=\'" + this.login + '\'' + '}';
   }

    public String getLogin() {
        return this.login;
   }

   public String getPassword() {
      return this.password;
   }


    public void setLogin(String login) {
        this.login = login;
   }

   public void setPassword(String password) {
      this.password = password;
   }

}

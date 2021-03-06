package quiz.web.rest;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JWTToken {
   private String idToken;

   public JWTToken(String idToken) {
      this.idToken = idToken;
   }

   @JsonProperty("token")
   public String getIdToken() {
      return this.idToken;
   }

   public void setIdToken(String idToken) {
      this.idToken = idToken;
   }
}

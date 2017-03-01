package quiz.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public final class SecurityUtils {
   public static String getCurrentUserLogin() {
      SecurityContext securityContext = SecurityContextHolder.getContext();
      Authentication authentication = securityContext.getAuthentication();
      String userName = null;
      if(authentication != null) {
         if(authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails)authentication.getPrincipal();
            userName = springSecurityUser.getUsername();
         } else if(authentication.getPrincipal() instanceof String) {
            userName = (String)authentication.getPrincipal();
         }
      }

      return userName;
   }

   public static Long getCurrentUserId() {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
       quiz.domain.User user = (quiz.domain.User) authentication.getPrincipal();
       return user.getId();
   }

   public static boolean isAuthenticated() {
      SecurityContext securityContext = SecurityContextHolder.getContext();
      Authentication authentication = securityContext.getAuthentication();
      return authentication != null?authentication.getAuthorities().stream().noneMatch((grantedAuthority) -> {
         return grantedAuthority.getAuthority().equals("ROLE_ANONYMOUS");
      }):false;
   }

   public static boolean isCurrentUserInRole(String authority) {
      SecurityContext securityContext = SecurityContextHolder.getContext();
      Authentication authentication = securityContext.getAuthentication();
      return authentication != null?authentication.getAuthorities().stream().anyMatch((grantedAuthority) -> {
         return grantedAuthority.getAuthority().equals(authority);
      }):false;
   }
}

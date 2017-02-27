package quiz.repository;

import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import quiz.domain.SocialUserConnection;

public interface SocialUserConnectionRepository extends JpaRepository {
   List findAllByProviderIdAndProviderUserId(String var1, String var2);

   List findAllByProviderIdAndProviderUserIdIn(String var1, Set var2);

   List findAllByUserIdOrderByProviderIdAscRankAsc(String var1);

   List findAllByUserIdAndProviderIdOrderByRankAsc(String var1, String var2);

   List findAllByUserIdAndProviderIdAndProviderUserIdIn(String var1, String var2, List var3);

   SocialUserConnection findOneByUserIdAndProviderIdAndProviderUserId(String var1, String var2, String var3);

   void deleteByUserIdAndProviderId(String var1, String var2);

   void deleteByUserIdAndProviderIdAndProviderUserId(String var1, String var2, String var3);
}

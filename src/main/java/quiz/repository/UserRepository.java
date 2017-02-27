package quiz.repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import quiz.domain.User;

public interface UserRepository extends JpaRepository {
   Optional findOneByActivationKey(String var1);

   List findAllByActivatedIsFalseAndCreatedDateBefore(ZonedDateTime var1);

   Optional findOneByResetKey(String var1);

   Optional findOneByLogin(String var1);

   @Query("select u.id from User u where u.login = :login")
   Long findIdByLogin(@Param("login") String var1);

   @Query(
      value = "select distinct user from User user left join fetch user.authorities",
      countQuery = "select count(user) from User user"
   )
   Page findAllWithAuthorities(Pageable var1);
}

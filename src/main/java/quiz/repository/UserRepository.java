package quiz.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import quiz.domain.User;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByActivationKey(String activationKey);

    List<User> findAllByActivatedIsFalseAndCreatedDateBefore(ZonedDateTime dateTime);

    Optional<User> findOneByResetKey(String resetKey);

    Optional<User> findOneByLogin(String login);


   @Query("select u.id from User u where u.login = :login")
   Long findIdByLogin(@Param("login") String login);

   @Query(
      value = "select distinct user from User user left join fetch user.authorities",
      countQuery = "select count(user) from User user"
   )
   Page<User> findAllWithAuthorities(Pageable pageable);
}

package quiz.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import quiz.domain.PersistentAuditEvent;

public interface PersistenceAuditEventRepository extends JpaRepository<PersistentAuditEvent, Long> {
   List<PersistentAuditEvent> findByPrincipal(String var1);

   List<PersistentAuditEvent> findByAuditEventDateAfter(LocalDateTime var1);

   List<PersistentAuditEvent> findByPrincipalAndAuditEventDateAfter(String var1, LocalDateTime var2);

   List<PersistentAuditEvent> findByPrincipalAndAuditEventDateAfterAndAuditEventType(String var1, LocalDateTime var2, String var3);

   Page<PersistentAuditEvent> findAllByAuditEventDateBetween(LocalDateTime var1, LocalDateTime var2, Pageable var3);
}

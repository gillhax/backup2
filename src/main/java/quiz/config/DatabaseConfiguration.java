package quiz.config;

import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.inject.Inject;

@Configuration
@EnableJpaRepositories({"quiz.repository"})
@EnableJpaAuditing(
   auditorAwareRef = "springSecurityAuditorAware"
)
@EnableTransactionManagement
public class DatabaseConfiguration {
   @Inject
   private Environment env;


   @Bean
   public Hibernate5Module hibernate5Module() {
      return new Hibernate5Module();
   }
}

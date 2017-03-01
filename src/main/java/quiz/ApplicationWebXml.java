package quiz;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import quiz.config.DefaultProfileUtil;

public class ApplicationWebXml extends SpringBootServletInitializer {
   protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
      DefaultProfileUtil.addDefaultProfile(application.application());
       return application.sources(QuizApp.class);
   }
}

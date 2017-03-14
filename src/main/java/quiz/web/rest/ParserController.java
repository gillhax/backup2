package quiz.web.rest;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import quiz.domain.Question;
import quiz.service.util.ParseQuestionsFile;
import quiz.web.rest.util.FilesUpload;
import springfox.documentation.annotations.ApiIgnore;

@RestController
@RequestMapping({"/api/parser/"})

@ApiIgnore
public class ParserController {

    private final ParseQuestionsFile parseQuestionsFile;

    public ParserController(ParseQuestionsFile parseQuestionsFile) {
        this.parseQuestionsFile = parseQuestionsFile;
    }

    @RequestMapping(
      value = {"upload"},
      method = {RequestMethod.POST}
   )
    public ResponseEntity uploadFilesParse(FilesUpload filesUpload) {
      this.parseQuestionsFile.main(filesUpload.getFiles());
      HttpHeaders headers = new HttpHeaders();
      headers.add("X-quizApp-alert", "quizApp.question.ExcelUploaded");
      headers.add("X-quizApp-params", "");
      return ((BodyBuilder)ResponseEntity.ok().headers(headers)).body(new Question());
   }


}

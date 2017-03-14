package quiz.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.*;
import quiz.converter.QuestionConverter;
import quiz.domain.Question;
import quiz.repository.QuestionRepository;
import quiz.service.QuestionService;
import quiz.service.VersionService;
import quiz.service.dto.admin.QuestionAdminDto;
import quiz.system.error.handler.dto.ResponseDto;
import quiz.system.util.StaticWrapper;
import quiz.web.rest.util.HeaderUtil;
import quiz.web.rest.util.PaginationUtil;
import springfox.documentation.annotations.ApiIgnore;

import javax.inject.Inject;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@ApiIgnore
@RequestMapping({"/api"})
public class QuestionResource {
   private final Logger log = LoggerFactory.getLogger(QuestionResource.class);
   @Inject
   private QuestionService questionService;
   @Inject
   private QuestionConverter questionConverter;
   @Inject
   private QuestionRepository questionRepository;
   @Inject
   private VersionService versionService;


    @ApiIgnore
    @Timed
    @RequestMapping(
        value = {"questions"},
        method = {RequestMethod.POST}
    )
    public ResponseDto createQuestion(@RequestBody QuestionAdminDto questionAdminDto) throws URISyntaxException {
        Question result = this.questionService.saveDto(questionAdminDto);
        this.versionService.refreshQuestions();
        return StaticWrapper.wrap(result);
    }


    @ApiIgnore
    @RequestMapping(
        value = {"/questions"},
        method = {RequestMethod.PUT}
    )
    @Timed
    public ResponseEntity updateHelpAdmin(@RequestBody QuestionAdminDto questionAdminDto) {
        Question question = questionService.updateDto(questionAdminDto);
        versionService.refreshQuestions();
        return Optional.ofNullable(question).map((result) -> {
            return new ResponseEntity(result, HttpStatus.OK);
        }).orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
    }


    @GetMapping({"/questions"})
   @Timed
   public ResponseEntity getAllQuestions(@ApiParam Pageable pageable,
                                         @RequestParam(value = "title", required = false) String title,
                                         @RequestParam(value = "category", required = false) Long categoryId,
                                         @RequestParam(value = "subcategory", required = false) Long subcategoryId
   ) throws URISyntaxException {
       Page page = this.questionService.findAll(pageable, title, categoryId, subcategoryId);
      HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/questions");
      return new ResponseEntity(page.getContent(), headers, HttpStatus.OK);
   }

   @GetMapping({"/questions/{id}"})
   @Timed
   public ResponseEntity getQuestion(@PathVariable Long id) {
      this.log.debug("REST request to get Question : {}", id);
      Question question = this.questionService.findOne(id);
      return (ResponseEntity)Optional.ofNullable(question).map((result) -> {
         return new ResponseEntity(result, HttpStatus.OK);
      }).orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
   }

   @DeleteMapping({"/questions/{id}"})
   @Timed
   public ResponseEntity deleteQuestion(@PathVariable Long id) {
      this.log.debug("REST request to delete Question : {}", id);
      this.questionService.delete(id);
      this.versionService.refreshQuestions();
      return ((BodyBuilder)ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("question", id.toString()))).build();
   }
}

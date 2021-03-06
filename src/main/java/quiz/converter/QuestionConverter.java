package quiz.converter;

import org.springframework.stereotype.Component;
import quiz.domain.MediaContainer;
import quiz.domain.Question;
import quiz.service.dto.AnswerDto;
import quiz.service.dto.QuestionDto;

import java.util.HashSet;

@Component
public class QuestionConverter extends Converter<Question, QuestionDto> {
   public QuestionDto toDTO(Question question) {
      if(question == null) {
         return null;
      } else {
         QuestionDto questionDto = new QuestionDto();
         questionDto.setId(question.getId());
         questionDto.setTitle(question.getTitle());
         questionDto.setVersion(question.getVersion().getTime());
         questionDto.setCategory(question.getSubcategory().getCategory().getName());
         MediaContainer mediaContainer = question.getMedia();
         if(mediaContainer != null) {
            questionDto.setMediaType(mediaContainer.getMediaType().toString());
            questionDto.setMedia(mediaContainer.getMedia());
         }

          HashSet<AnswerDto> answers = new HashSet<>();
          int right = question.getRightAnswer();
         answers.add(new AnswerDto(question.getAnswer1(), right == 1));
         answers.add(new AnswerDto(question.getAnswer2(), right == 2));
         answers.add(new AnswerDto(question.getAnswer3(), right == 3));
         answers.add(new AnswerDto(question.getAnswer4(), right == 4));
         questionDto.setAnswers(answers);
         return questionDto;
      }
   }
}

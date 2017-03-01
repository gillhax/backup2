package quiz.service;

import quiz.converter.QuestionConverter;
import quiz.domain.Question;
import quiz.repository.QuestionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import quiz.service.dto.QuestionDto;
import quiz.system.error.ApiAssert;

import javax.inject.Inject;
import java.util.List;

/**
 * Service Implementation for managing Question.
 */
@Service
@Transactional
public class QuestionService {

    private final Logger log = LoggerFactory.getLogger(QuestionService.class);

    @Inject
    private QuestionRepository questionRepository;

    @Inject
    private QuestionConverter questionConverter;


    /**
     * Save a question.
     *
     * @param question the entity to save
     * @return the persisted entity
     */
    public Question save(Question question) {
        log.debug("Request to save Question : {}", question);
        Question result = questionRepository.save(question);
        return result;
    }

    /**
     *  Get all the questions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Question> findAll(Pageable pageable) {
        log.debug("Request to get all Questions");
        Page<Question> result = questionRepository.findAll(pageable);
        return result;
    }

    /**
     *  Get one question by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Question findOne(Long id) {
        log.debug("Request to get Question : {}", id);
        Question question = questionRepository.findOne(id);
        return question;
    }

    /**
     *  Delete the  question by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Question : {}", id);
        questionRepository.delete(id);
    }


    public List<QuestionDto> getAllOffline() {
        List<Question> questions = questionRepository.findAll();
        return questionConverter.toDTOs(questions);
    }

    public QuestionDto findById(Long id) {
        Question question = questionRepository.findOne(id);
        ApiAssert.notFound(question == null, "not-found.question");
        return questionConverter.toDTO(question);
    }
}

package quiz.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.converter.QuestionConverter;
import quiz.domain.Category;
import quiz.domain.MediaContainer;
import quiz.domain.Question;
import quiz.domain.Subcategory;
import quiz.repository.CategoryRepository;
import quiz.repository.QuestionRepository;
import quiz.repository.SubcategoryRepository;
import quiz.service.dto.QuestionDto;
import quiz.service.dto.admin.QuestionAdminDto;
import quiz.system.error.ApiAssert;

import java.sql.Timestamp;
import java.util.List;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.contains;

@Service
@Transactional
public class QuestionService {
    private final Logger log = LoggerFactory.getLogger(QuestionService.class);

    private final QuestionRepository questionRepository;

    private final QuestionConverter questionConverter;

    private final SubcategoryRepository subcategoryRepository;

    private final CategoryRepository categoryRepository;


    private final MediaContainerService mediaContainerService;

    public QuestionService(QuestionRepository questionRepository, QuestionConverter questionConverter,
                           SubcategoryRepository subcategoryRepository, CategoryRepository categoryRepository,
                           MediaContainerService mediaContainerService) {
        this.questionRepository = questionRepository;
        this.questionConverter = questionConverter;
        this.subcategoryRepository = subcategoryRepository;
        this.categoryRepository = categoryRepository;
        this.mediaContainerService = mediaContainerService;
    }

    public Question save(Question question) {
        this.log.debug("Request to save Question : {}", question);
        Question result = (Question) this.questionRepository.save(question);
        return result;
    }

    @Transactional(
        readOnly = true
    )
    public Page<Question> findAll(Pageable pageable, String title, Long categoryId, Long subcategoryId) {

        ExampleMatcher matcher = ExampleMatcher.matching()
            .withIgnorePaths("answer1", "answer2", "answer3", "answer4",
                "rightAnswer", "version", "media", "subcategory.name", "subcategory.category.name"
            );

        Question question = new Question();

        if (title != null && !title.equals("")) {
            matcher = matcher.withMatcher("title", contains());
            question.setTitle(title);
        }


        if (categoryId == null && subcategoryId == null) {
            matcher = matcher.withIgnorePaths("subcategory");

        } else if (subcategoryId != null) {
            Subcategory subcategory = subcategoryRepository.findOne(subcategoryId);
            if (subcategory != null) {
                question.setSubcategory(subcategory);
            } else {
                question.setSubcategory(new Subcategory());
            }
        } else {
            Category category = categoryRepository.findOne(categoryId);
            if (category != null) {
                question.setSubcategory(new Subcategory());
                question.getSubcategory().setCategory(category);
            } else {
                matcher = matcher.withIgnorePaths("subcategory.category");
            }
        }

        Example<Question> example = Example.of(question, matcher);
        Page<Question> result = questionRepository.findAll(example, pageable);
        return result;
    }

    @Transactional(
        readOnly = true
    )
    public Question findOne(Long id) {
        this.log.debug("Request to get Question : {}", id);
        Question question = (Question) this.questionRepository.findOne(id);
        return question;
    }

    public void delete(Long id) {
        this.log.debug("Request to delete Question : {}", id);
        this.questionRepository.delete(id);
    }

    public List getAllOffline() {
        List questions = this.questionRepository.findAll();
        return this.questionConverter.toDTOs(questions);
    }

    public QuestionDto findById(Long id) {
        Question question = (Question) this.questionRepository.findOne(id);
        ApiAssert.notFound(question == null, "not-found.question");
        return this.questionConverter.toDTO(question);
    }


    public Question saveDto(QuestionAdminDto questionAdminDto) {
        Question newQuestion = new Question();
        newQuestion.setTitle(questionAdminDto.getTitle());
        newQuestion.setSubcategory(questionAdminDto.getSubcategory());
        newQuestion.setAnswer1(questionAdminDto.getAnswer1());
        newQuestion.setAnswer2(questionAdminDto.getAnswer2());
        newQuestion.setAnswer3(questionAdminDto.getAnswer3());
        newQuestion.setAnswer4(questionAdminDto.getAnswer4());
        newQuestion.setRightAnswer(questionAdminDto.getRightAnswer());

        if (questionAdminDto.getFile() != null) {
            MediaContainer media = mediaContainerService.create(questionAdminDto.getFile());
            newQuestion.setMedia(media);
        }

        newQuestion.setVersion(new Timestamp(System.currentTimeMillis()));
        Question result = questionRepository.save(newQuestion);
        return result;
    }


    public Question updateDto(QuestionAdminDto questionAdminDto) {
        Question question = questionRepository.findOne(questionAdminDto.getId());
        ApiAssert.notFound(question == null, "not-found.entity");

        question.setTitle(questionAdminDto.getTitle());
        question.setSubcategory(questionAdminDto.getSubcategory());
        question.setAnswer1(questionAdminDto.getAnswer1());
        question.setAnswer2(questionAdminDto.getAnswer2());
        question.setAnswer3(questionAdminDto.getAnswer3());
        question.setAnswer4(questionAdminDto.getAnswer4());
        question.setRightAnswer(questionAdminDto.getRightAnswer());

        if (questionAdminDto.getFile() != null && question.getMedia() != null && !questionAdminDto.getRemoveMedia()) {
            MediaContainer media = mediaContainerService.update(questionAdminDto.getMedia().getId(), questionAdminDto.getFile());
            question.setMedia(media);
        } else if (questionAdminDto.getFile() != null && question.getMedia() == null && !questionAdminDto.getRemoveMedia()) {
            MediaContainer media = mediaContainerService.create(questionAdminDto.getFile());
            question.setMedia(media);
        }
        if (questionAdminDto.getRemoveMedia()) {
            question.setMedia(null);
        }

        question.setVersion(new Timestamp(System.currentTimeMillis()));
        return question;
    }
}

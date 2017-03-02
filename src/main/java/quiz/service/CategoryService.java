package quiz.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.converter.CategoryConverter;
import quiz.domain.Category;
import quiz.repository.CategoryRepository;
import quiz.repository.QuestionRepository;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service Implementation for managing Category.
 */
@Service
@Transactional
public class CategoryService {

    private final Logger log = LoggerFactory.getLogger(CategoryService.class);

    @Inject
    private CategoryRepository categoryRepository;

    @Inject
    private CategoryConverter categoryConverter;

    @Inject
    private QuestionRepository questionRepository;

    @Inject
    private VersionService versionService;

    /**
     * Save a category.
     *
     * @param category the entity to save
     * @return the persisted entity
     */
    public Category save(Category category) {
        log.debug("Request to save Category : {}", category);
        Category result = categoryRepository.save(category);
        return result;
    }

    /**
     *  Get all the categories.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Category> findAll(Pageable pageable) {
        log.debug("Request to get all Categories");
        Page<Category> result = categoryRepository.findAll(pageable);
        return result;
    }

    @Transactional
    public Map<String, List> getAll(Long version) {
        long questionsVersion = versionService.getVersions().getQuestions();
        if (version == null || version < questionsVersion) {
            Map result = new HashMap<>();
            result.put("version", questionsVersion);
            List<Category> categories = categoryRepository.findAllEager();
            result.put("categories", categoryConverter.toDTOs(categories));
            return result;
        }
        return null;
    }

    /**
     *  Get one category by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Category findOne(Long id) {
        log.debug("Request to get Category : {}", id);
        Category category = categoryRepository.findOne(id);
        return category;
    }

    /**
     *  Delete the  category by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Category : {}", id);
        categoryRepository.delete(id);
    }
}

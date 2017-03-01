package quiz.service;

import org.springframework.web.multipart.MultipartFile;
import quiz.domain.Avatar;
import quiz.domain.Help;
import quiz.repository.HelpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import quiz.system.error.ApiAssert;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service Implementation for managing Help.
 */
@Service
@Transactional
public class HelpService {

    private final Logger log = LoggerFactory.getLogger(HelpService.class);

    @Inject
    private HelpRepository helpRepository;

    @Inject
    private ImageService imageService;

    @Inject
    private VersionService versionService;

    /**
     * Save a help.
     *
     * @param help the entity to save
     * @return the persisted entity
     */
    public Help save(String title, String description, MultipartFile image) {
        Help newHelp = new Help();
        imageService.save(
            image,
            "help",
            new ImageService.ImageBridge() {
                @Override
                void saveNew(String imageName) {
                    newHelp.setImage(imageName);
                }

                @Override
                String getOld() {
                    return null;
                }

            });
        newHelp.setTitle(title);
        newHelp.setDescription(description);
        Help result = helpRepository.save(newHelp);
        return result;
    }




    public Help update(Long id, String title, String description, MultipartFile image) {
        Help help = helpRepository.findOne(id);
        ApiAssert.notFound(help == null, "not-found.entity");
        imageService.save(
            image,
            "help",
            new ImageService.ImageBridge() {
                @Override
                void saveNew(String imageName) {
                    help.setImage(imageName);
                }

                @Override
                String getOld() {
                    return help.getImage();
                }

            });
        Help result = helpRepository.save(help);
        return result;
    }
    /**
     *  Get all the helps.
     *
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Help> findAll() {
        log.debug("Request to get all Helps");
        List<Help> result = helpRepository.findAll();

        return result;
    }

    /**
     *  Get one help by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public Help findOne(Long id) {
        log.debug("Request to get Help : {}", id);
        Help help = helpRepository.findOne(id);
        return help;
    }

    /**
     *  Delete the  help by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        Help help = helpRepository.findOne(id);
        ApiAssert.notFound(help == null, "not-found.entity");
        imageService.delete(help.getImage());
        helpRepository.delete(id);
    }

    public Map<String, List> getHelp(Long version) {
        long helpVersion = versionService.getVersions().getHelps();
        if (version == null || version < helpVersion) {
            Map result = new HashMap<>();
            result.put("version", helpVersion);
            List<Help> helps = helpRepository.findAll();
            result.put("help", helps);
            return result;
        }
        return null;
    }
}

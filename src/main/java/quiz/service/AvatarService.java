package quiz.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import quiz.converter.AvatarConverter;
import quiz.domain.Avatar;
import quiz.repository.AvatarRepository;
import quiz.service.dto.admin.AvatarAdminDto;
import quiz.system.error.ApiAssert;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service Implementation for managing Avatar.
 */
@Service
@Transactional
public class AvatarService {

    private final Logger log = LoggerFactory.getLogger(AvatarService.class);

    @Inject
    private AvatarRepository avatarRepository;

    @Inject
    private ImageService imageService;

    @Inject
    private AvatarConverter avatarConverter;

    @Inject
    private VersionService versionService;


    public Avatar create(MultipartFile image) {
        Avatar avatar = new Avatar();

        imageService.save(
            image,
            "avatar",
            new ImageService.ImageBridge() {
                @Override
                void saveNew(String imageName) {
                    avatar.setPath(imageName);
                }

                @Override
                String getOld() {
                    return null;
                }

            });

        Avatar result = avatarRepository.save(avatar);
        return result;
    }


    public Avatar saveDto(AvatarAdminDto avatarAdminDto) {
        Avatar newAvatar = new Avatar();
        if (avatarAdminDto.getFile() != null) {
            String imagePath = imageService.saveBase64ImageNoLimit(avatarAdminDto.getFile(), "avatars");
            newAvatar.setPath(imagePath);

            return avatarRepository.save(newAvatar);
        } else {
            return null;
        }
    }

    public Avatar updateDto(AvatarAdminDto avatarAdminDto) {
        Avatar avatar = avatarRepository.findOne(avatarAdminDto.getId());
        ApiAssert.notFound(avatar == null, "not-found.entity");
        if (avatarAdminDto.getFile() != null) {
            String imagePath = this.imageService.saveBase64ImageNoLimit(avatarAdminDto.getFile(), "avatars");
            imageService.delete(avatarAdminDto.getPath());
            avatar.setPath(imagePath);
            return avatar;
        } else {
            return avatar;
        }
    }

    public Avatar update(int avatarId, MultipartFile image) {
        Avatar avatar = avatarRepository.findOne(avatarId);
        //TODO: check on exist
        if (avatar == null) return null;
        imageService.save(
            image,
            "avatar",
            new ImageService.ImageBridge() {
                @Override
                void saveNew(String imageName) {
                    avatar.setPath(imageName);
                }

                @Override
                String getOld() {
                    return avatar.getPath();
                }

            });

        Avatar result = avatarRepository.save(avatar);
        return result;
    }

    /**
     * Get all the avatars.
     *
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public List<Avatar> findAll() {
        log.debug("Request to get all Avatars");
        List<Avatar> result = avatarRepository.findAll();

        return result;
    }

    /**
     * Get one avatar by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Avatar findOne(Integer id) {
        log.debug("Request to get Avatar : {}", id);
        Avatar avatar = avatarRepository.findOne(id);
        return avatar;
    }

    /**
     * Delete the  avatar by id.
     *
     * @param id the id of the entity
     */
    public void delete(Integer id) {
        log.debug("Request to delete Avatar : {}", id);
        Avatar avatar = avatarRepository.findOne(id);
        imageService.delete(avatar.getPath());
        avatarRepository.delete(id);
    }


    public Map<String, List> getAll(Long version) {
        long avatarVersion = versionService.getVersions().getAvatars();
        if (version == null || version < avatarVersion) {
            Map result = new HashMap<>();
            result.put("version", avatarVersion);
            List<Avatar> avatars = avatarRepository.findAll();
            result.put("avatars", avatarConverter.toDTOs(avatars));
            return result;
        }
        return null;
    }
}

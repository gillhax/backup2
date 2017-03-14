package quiz.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import quiz.converter.AvatarConverter;
import quiz.domain.MediaContainer;
import quiz.domain.MediaType;
import quiz.repository.MediaContainerRepository;
import quiz.system.error.ApiAssert;

import javax.inject.Inject;
import java.util.List;

@Service
@Transactional
public class MediaContainerService {
    @Inject
    private MediaContainerRepository mediaContainerRepository;
    @Inject
    private ImageService imageService;
    @Inject
    private AvatarConverter avatarConverter;
    @Inject
    private VersionService versionService;

    public MediaContainer create(MultipartFile image) {
        final MediaContainer mediaContainer = new MediaContainer();
        this.imageService.save(image, "questions", new ImageService.ImageBridge[]{new ImageService.ImageBridge() {
            void saveNew(String imageName) {
                mediaContainer.setMedia(imageName);
            }

            String getOld() {
                return null;
            }
        }});
        mediaContainer.setMediaType(MediaType.PHOTO);
        MediaContainer result = (MediaContainer) this.mediaContainerRepository.saveAndFlush(mediaContainer);
        return result;
    }


    public MediaContainer create(String file) {
        final MediaContainer mediaContainer = new MediaContainer();
        String imagePath = imageService.saveBase64ImageNoLimit(file, "questions");
        mediaContainer.setMediaType(MediaType.PHOTO);
        mediaContainer.setMedia(imagePath);
        MediaContainer result = this.mediaContainerRepository.saveAndFlush(mediaContainer);
        return result;
    }

    public MediaContainer update(long mediaId, MultipartFile image) {
        final MediaContainer mediaContainer = (MediaContainer) this.mediaContainerRepository.findOne(Long.valueOf(mediaId));
        ApiAssert.notFound(mediaContainer == null, "not-found.media");
        this.imageService.save(image, "questions", new ImageService.ImageBridge[]{new ImageService.ImageBridge() {
            void saveNew(String imageName) {
                mediaContainer.setMedia(imageName);
            }

            String getOld() {
                return mediaContainer.getMedia();
            }
        }});
        mediaContainer.setMediaType(MediaType.PHOTO);
        MediaContainer result = (MediaContainer) this.mediaContainerRepository.save(mediaContainer);
        return result;
    }

    public MediaContainer update(long mediaId, String file) {
        final MediaContainer mediaContainer = mediaContainerRepository.findOne(mediaId);
        ApiAssert.notFound(mediaContainer == null, "not-found.media");
        String imagePath = imageService.saveBase64ImageNoLimit(file, "questions");
        imageService.delete(mediaContainer.getMedia());
        mediaContainer.setMedia(imagePath);
        MediaContainer result = this.mediaContainerRepository.save(mediaContainer);
        return result;
    }

    @Transactional(
        readOnly = true
    )
    public List findAll() {
        List result = this.mediaContainerRepository.findAll();
        return result;
    }

    @Transactional(
        readOnly = true
    )
    public MediaContainer findOne(Long id) {
        MediaContainer mediaContainer = (MediaContainer) this.mediaContainerRepository.findOne(id);
        ApiAssert.notFound(mediaContainer == null, "not-found.media");
        return mediaContainer;
    }

    public void delete(Long id) {
        MediaContainer mediaContainer = (MediaContainer) this.mediaContainerRepository.findOne(id);
        ApiAssert.notFound(mediaContainer == null, "not-found.media");
        ApiAssert.unprocessable(!mediaContainer.getQuestions().isEmpty(), "media.questions.exist");
        this.imageService.delete(mediaContainer.getMedia());
        this.mediaContainerRepository.delete(id);
    }
}

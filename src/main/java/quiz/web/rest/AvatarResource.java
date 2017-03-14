package quiz.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.*;
import quiz.domain.Avatar;
import quiz.service.AvatarService;
import quiz.service.ImageService;
import quiz.service.VersionService;
import quiz.service.dto.admin.AvatarAdminDto;
import quiz.system.error.handler.dto.ResponseDto;
import quiz.system.util.StaticWrapper;
import quiz.web.rest.util.HeaderUtil;
import springfox.documentation.annotations.ApiIgnore;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@ApiIgnore
@RestController
@RequestMapping({"/api"})
public class AvatarResource {
    private final Logger log = LoggerFactory.getLogger(AvatarResource.class);

    private final AvatarService avatarService;

    private final ImageService imageService;

    private final VersionService versionService;

    public AvatarResource(AvatarService avatarService, ImageService imageService, VersionService versionService) {
        this.avatarService = avatarService;
        this.imageService = imageService;
        this.versionService = versionService;
    }


    @Timed
    @RequestMapping(
        value = {"avatars"},
        method = {RequestMethod.POST}
    )
    public ResponseDto createAvatar(@RequestBody AvatarAdminDto avatarAdminDto) throws URISyntaxException {
        Avatar result = avatarService.saveDto(avatarAdminDto);
        this.versionService.refreshAvatars();
        return StaticWrapper.wrap(result);
    }

    @Timed
    @RequestMapping(
        value = {"/avatars"},
        method = {RequestMethod.PUT}
    )
    public ResponseEntity updateAvatar(@RequestBody AvatarAdminDto avatarAdminDto) throws URISyntaxException {
        Avatar avatar = avatarService.updateDto(avatarAdminDto);
        versionService.refreshAvatars();
        return (ResponseEntity) Optional.ofNullable(avatar).map((result) -> {
            return new ResponseEntity(result, HttpStatus.OK);
        }).orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
    }


    @ApiIgnore
    @GetMapping({"/avatars"})
    @Timed
    public List getAllAvatars() {
        this.log.debug("REST request to get all Avatars");
        return this.avatarService.findAll();
    }

    @ApiIgnore
    @GetMapping({"/avatars/{id}"})
    @Timed
    public ResponseEntity getAvatar(@PathVariable Integer id) {
        this.log.debug("REST request to get Avatar : {}", id);
        Avatar avatar = this.avatarService.findOne(id);
        return (ResponseEntity)Optional.ofNullable(avatar).map((result) -> {
            return new ResponseEntity(result, HttpStatus.OK);
        }).orElse(new ResponseEntity(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping({"/avatars/{id}"})
    @Timed
    public ResponseEntity deleteAvatar(@PathVariable Integer id) {
        this.log.debug("REST request to delete Avatar : {}", id);
        this.avatarService.delete(id);
        this.versionService.refreshAvatars();
        return ((BodyBuilder)ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("avatar", id.toString()))).build();
    }
}

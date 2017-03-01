package quiz.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.converter.PlayerConverter;
import quiz.domain.*;
import quiz.repository.*;
import quiz.security.AuthoritiesConstants;
import quiz.security.SecurityUtils;
import quiz.service.dto.VersionDto;
import quiz.service.util.RandomUtil;
import quiz.system.error.ApiAssert;
import quiz.web.rest.vm.ManagedCreateUserVM;
import quiz.web.rest.vm.ManagedUserVM;

import javax.inject.Inject;
import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Service class for managing users.
 */
@Service
@Transactional
public class VersionService {

    @Inject
    private VersionRepository versionRepository;


    public void refreshAvatars() {
        Version version = versionRepository.getOne(1);
        ApiAssert.notFound(version == null, "not-found.entity");
        version.setAvatars(new Timestamp(System.currentTimeMillis()));
        versionRepository.flush();
    }

    public void refreshCategories() {
        Version version = versionRepository.getOne(1);
        ApiAssert.notFound(version == null, "not-found.entity");
        version.setCategories(new Timestamp(System.currentTimeMillis()));
        versionRepository.flush();
    }

    public void refreshHelps() {
        Version version = versionRepository.getOne(1);
        ApiAssert.notFound(version == null, "not-found.entity");
        version.setHelps(new Timestamp(System.currentTimeMillis()));
        versionRepository.flush();
    }

    public void refreshQuestions() {
        Version version = versionRepository.getOne(1);
        ApiAssert.notFound(version == null, "not-found.entity");
        version.setQuestions(new Timestamp(System.currentTimeMillis()));
        versionRepository.flush();
    }

    public VersionDto getVersions() {
        Version version = versionRepository.getOne(1);
        ApiAssert.notFound(version == null, "not-found.entity");
        VersionDto versionDto = new VersionDto();
        versionDto.setAvatars(version.getAvatars().getTime());
        versionDto.setCategories(version.getCategories().getTime());
        versionDto.setHelps(version.getHelps().getTime());
        versionDto.setQuestions(version.getQuestions().getTime());
        return versionDto;
    }

}

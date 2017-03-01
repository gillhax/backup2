package quiz.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import quiz.converter.AvatarConverter;
import quiz.domain.Avatar;
import quiz.domain.OfferTradition;
import quiz.domain.OfferTraditionAttach;
import quiz.repository.AvatarRepository;
import quiz.repository.OfferTraditionAttachRepository;
import quiz.repository.OfferTraditionRepository;
import quiz.service.ImageService;
import quiz.service.dto.AvatarDto;
import quiz.service.dto.OfferTraditionDtoIn;
import quiz.system.error.ApiAssert;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Service Implementation for managing OfferTradition.
 */
@Service
@Transactional
public class OfferTraditionService {
    @Inject
    private ImageService imageService;

    @Inject
    private OfferTraditionRepository offerTraditionRepository;

    @Inject
    private OfferTraditionAttachRepository offerTraditionAttachRepository;

    public void create(OfferTraditionDtoIn offerTraditionDtoIn) {
        boolean withAttaches = offerTraditionDtoIn.getBase64Images() != null;
        OfferTradition offerTradition = new OfferTradition();
        offerTradition.setText(offerTraditionDtoIn.getText());
        offerTradition.setWithAttaches(withAttaches);
        OfferTradition savedOfferTradition = offerTraditionRepository.saveAndFlush(offerTradition);
        if (withAttaches) {
            Iterator<String> imagesIterator = offerTraditionDtoIn.getBase64Images().iterator();
            int i = 1;
            do {
                String path = imageService.saveBase64ImageWithLimit(imagesIterator.next(), "offer_tradition");
                OfferTraditionAttach attach = new OfferTraditionAttach();
                attach.setPath(path);
                attach.setOfferId(savedOfferTradition.getId());
                offerTraditionAttachRepository.save(attach);
                i++;
            } while (imagesIterator.hasNext() && i <= 3);
        }
    }

    public Page<OfferTradition> findAll(Pageable pageable) {
        Page<OfferTradition> offerTraditions = offerTraditionRepository.findAll(pageable);
        //extract attaches
        for (OfferTradition offer : offerTraditions) {
            if (offer.isWithAttaches()) {
                offer.getAttaches().size();
            }
        }
        return offerTraditions;
    }


    public OfferTradition findOne(Long id) {
        OfferTradition offerTradition = offerTraditionRepository.findOne(id);
        ApiAssert.notFound(offerTradition == null, "not-found.entity");
        //extract attaches
        if (offerTradition.isWithAttaches()) {
            offerTradition.getAttaches().size();
        }
        return offerTradition;
    }

    public void delete(Long id) {
        OfferTradition offerTradition = offerTraditionRepository.findOne(id);
        ApiAssert.notFound(offerTradition == null, "not-found.entity");
        if (!offerTradition.getAttaches().isEmpty()) {
            for (OfferTraditionAttach attach :
                offerTradition.getAttaches()) {
                imageService.delete(attach.getPath());
                offerTraditionAttachRepository.delete(attach);
            }
        }
        offerTraditionRepository.delete(id);
    }
}

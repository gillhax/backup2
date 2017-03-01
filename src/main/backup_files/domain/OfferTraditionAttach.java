package quiz.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import quiz.domain.util.ImageUrlJsonSerializer;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * A OfferTraditionAttach.
 */
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "offer_tradition_attach")
public class OfferTraditionAttach {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min = 1, max = 512)
    @Column(name = "path", length = 512)
    @JsonSerialize(using = ImageUrlJsonSerializer.class)
    private String path;

    @JsonIgnore
    @Column(name = "offer_id")
    private Long offerId;
}

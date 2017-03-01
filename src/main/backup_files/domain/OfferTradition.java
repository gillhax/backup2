package quiz.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GeneratorType;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.cloud.cloudfoundry.com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;

/**
 * A OfferTradition.
 */
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "offer_tradition")
public class OfferTradition {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Size(min = 1, max = 5120)
    @Column(columnDefinition = "TEXT", name = "text", length = 5120)
    private String text;

    @Column(name = "date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private boolean withAttaches;

    @OneToMany(mappedBy = "offerId", fetch = FetchType.LAZY)
    List<OfferTraditionAttach> attaches;
}

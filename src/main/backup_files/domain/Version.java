package quiz.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.sql.Timestamp;

/**
 * A Version.
 */
@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "version")
public class Version {

    @Id
    private Integer id;

    @Column(name = "avatars")
    private Timestamp avatars;

    @Column(name = "helps")
    private Timestamp helps;

    @Column(name = "questions")
    private Timestamp questions;

    @Column(name = "categories")
    private Timestamp categories;

}

CREATE TABLE `avatar` (
    `id`   INT(11) NOT NULL           AUTO_INCREMENT,
    `path` VARCHAR(512)               DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `category` (
    `id`   BIGINT(20)  NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(64) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_category_name` (`name`)
);


CREATE TABLE `help` (
    `id`          BIGINT(20)    NOT NULL AUTO_INCREMENT,
    `title`       VARCHAR(128)  NOT NULL,
    `description` VARCHAR(2560) NOT NULL,
    `image`       VARCHAR(512)           DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `jhi_authority` (
    `name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`name`)
);


CREATE TABLE `jhi_persistent_audit_event` (
    `event_id`   BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `principal`  VARCHAR(100) NOT NULL,
    `event_date` TIMESTAMP    NULL     DEFAULT NULL,
    `event_type` VARCHAR(255)          DEFAULT NULL,
    PRIMARY KEY (`event_id`),
    KEY `idx_persistent_audit_event` (`principal`, `event_date`)
);


CREATE TABLE `jhi_persistent_audit_evt_data` (
    `event_id` BIGINT(20)   NOT NULL,
    `name`     VARCHAR(150) NOT NULL,
    `value`    VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (`event_id`, `name`),
    KEY `idx_persistent_audit_evt_data` (`event_id`),
    CONSTRAINT `fk_evt_pers_audit_evt_data` FOREIGN KEY (`event_id`) REFERENCES `jhi_persistent_audit_event` (`event_id`)
);


CREATE TABLE `jhi_social_user_connection` (
    `id`               BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `user_id`          VARCHAR(255) NOT NULL,
    `provider_id`      VARCHAR(255) NOT NULL,
    `provider_user_id` VARCHAR(255) NOT NULL,
    `rank`             BIGINT(20)   NOT NULL,
    `display_name`     VARCHAR(255)          DEFAULT NULL,
    `profile_url`      VARCHAR(255)          DEFAULT NULL,
    `image_url`        VARCHAR(255)          DEFAULT NULL,
    `access_token`     VARCHAR(255) NOT NULL,
    `secret`           VARCHAR(255)          DEFAULT NULL,
    `refresh_token`    VARCHAR(255)          DEFAULT NULL,
    `expire_time`      BIGINT(20)            DEFAULT NULL,
    PRIMARY KEY (`id`)
);


CREATE TABLE `jhi_user` (
    `id`                 BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `login`              VARCHAR(100) NOT NULL,
    `password_hash`      VARCHAR(60)           DEFAULT NULL,
    `activated`          BIT(1)       NOT NULL,
    `lang_key`           VARCHAR(5)            DEFAULT NULL,
    `activation_key`     VARCHAR(20)           DEFAULT NULL,
    `reset_key`          VARCHAR(20)           DEFAULT NULL,
    `created_by`         VARCHAR(50)  NOT NULL,
    `created_date`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `reset_date`         TIMESTAMP    NULL     DEFAULT NULL,
    `last_modified_by`   VARCHAR(50)           DEFAULT NULL,
    `last_modified_date` TIMESTAMP    NULL     DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `login` (`login`),
    UNIQUE KEY `idx_user_login` (`login`)
);


CREATE TABLE `jhi_user_authority` (
    `user_id`        BIGINT(20)  NOT NULL,
    `authority_name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`user_id`, `authority_name`),
    KEY `fk_authority_name` (`authority_name`),
    CONSTRAINT `fk_authority_name` FOREIGN KEY (`authority_name`) REFERENCES `jhi_authority` (`name`),
    CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE `media_container` (
    `id`         BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `media_type` VARCHAR(20)  NOT NULL,
    `media`      VARCHAR(512) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_media_container_media_type` (`media_type`)
);


CREATE TABLE `offer_tradition` (
    `id`            BIGINT(20) NOT NULL AUTO_INCREMENT,
    `user_id`       BIGINT(20)          DEFAULT NULL,
    `text`          TEXT       NOT NULL,
    `date`          TIMESTAMP  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `with_attaches` BIT(1)     NOT NULL DEFAULT b'0',
    PRIMARY KEY (`id`),
    KEY `idx_offer_tradition_date` (`date`)
);


CREATE TABLE `offer_tradition_attach` (
    `id`       BIGINT(20) NOT NULL        AUTO_INCREMENT,
    `path`     VARCHAR(512)               DEFAULT NULL,
    `offer_id` BIGINT(20) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_offer_tradition_attach_offer_id` (`offer_id`),
    CONSTRAINT `fk_offer_tradition_attach_offer_tradition_id` FOREIGN KEY (`offer_id`) REFERENCES `offer_tradition` (`id`)
);


CREATE TABLE `player` (
    `id`        BIGINT(20) NOT NULL        AUTO_INCREMENT,
    `name`      VARCHAR(64)                DEFAULT NULL,
    `score`     BIGINT(20)                 DEFAULT NULL,
    `avatar_id` INT(11)                    DEFAULT NULL,
    `version`   TIMESTAMP  NOT NULL        DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_player_score` (`score`),
    KEY `fk_player_avatar_id` (`avatar_id`),
    CONSTRAINT `fk_player_avatar_id` FOREIGN KEY (`avatar_id`) REFERENCES `avatar` (`id`),
    CONSTRAINT `p_user_id` FOREIGN KEY (`id`) REFERENCES `jhi_user` (`id`)
);


CREATE TABLE `subcategory` (
    `id`          BIGINT(20)  NOT NULL AUTO_INCREMENT,
    `name`        VARCHAR(64) NOT NULL,
    `category_id` BIGINT(20)  NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk_subcategory_category_id` (`category_id`),
    CONSTRAINT `fk_subcategory_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
);


CREATE TABLE `question` (
    `id`             BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `version`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `title`          VARCHAR(255) NOT NULL,
    `media_id`       BIGINT(20)            DEFAULT NULL,
    `answer_1`       VARCHAR(64)  NOT NULL,
    `answer_2`       VARCHAR(64)  NOT NULL,
    `answer_3`       VARCHAR(64)  NOT NULL,
    `answer_4`       VARCHAR(64)  NOT NULL,
    `right_answer`   INT(11)      NOT NULL,
    `subcategory_id` BIGINT(20)   NOT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_question_title_subcategory_id` (`subcategory_id`),
    KEY `idx_question_media_id` (`media_id`),
    CONSTRAINT `fk_question_media_container_id` FOREIGN KEY (`media_id`) REFERENCES `media_container` (`id`),
    CONSTRAINT `fk_question_subcategory_id_id` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`id`)
);


CREATE TABLE `security_token` (
    `id`      BIGINT(20)   NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT(20)   NOT NULL,
    `token`   VARCHAR(160) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `idx_security_token_token` (`token`),
    KEY `idx_security_token_user_id` (`user_id`),
    CONSTRAINT `fk_security_token_user_id_user_od` FOREIGN KEY (`user_id`) REFERENCES `jhi_user` (`id`)
);


CREATE TABLE `version` (
    `id`         INT(11)   NOT NULL AUTO_INCREMENT,
    `avatars`    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `helps`      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `questions`  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `categories` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

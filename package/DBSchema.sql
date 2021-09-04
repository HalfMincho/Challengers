use challengers;

create table account
(
    uuid                    binary(16)      not null,
    email                   varchar(255)    not null,
    password                char(151)       not null,
    name                    varchar(25)     not null,
    experience              int   default 0 null,
    success_rate            float default 0 null,
    profile_image           longtext        null,
    profile_image_extension varchar(10)     null,
    login_type              varchar(25)     null,
    constraint account_uuid_uindex
        unique (uuid)
);

alter table account
    add primary key (uuid);

create table account_challenge
(
    account    binary(16)           not null,
    challenge  binary(16)           null,
    is_success tinyint(1) default 0 not null
);

create index account_challenge_account_challenge_index
    on account_challenge (account, challenge);

create index account_challenge_account_index
    on account_challenge (account);

create index account_challenge_account_is_success_index
    on account_challenge (account, is_success);

create table category
(
    uuid binary(16)  not null,
    name varchar(25) not null,
    constraint category_uuid_uindex
        unique (uuid)
);

alter table category
    add primary key (uuid);

create table challenge
(
    id                int auto_increment,
    uuid              binary(16)                         not null,
    submitter         binary(16)                         not null,
    category          binary(16)                         not null,
    name              varchar(25)                        not null,
    auth_way          tinyint                            not null,
    auth_day          char(7)                            not null,
    auth_count_in_day int                                not null,
    start_at          datetime default CURRENT_TIMESTAMP not null,
    end_at            datetime default CURRENT_TIMESTAMP not null,
    cost              int                                not null,
    description       text                               null,
    reg_date          datetime default CURRENT_TIMESTAMP not null,
    views             int      default 1                 not null,
    constraint challenge_id_uindex
        unique (id),
    constraint challenge_uuid_uindex
        unique (uuid)
);

alter table challenge
    add primary key (uuid);

create table challenge_auth
(
    uuid        binary(16)                         not null,
    submitter   binary(16)                         not null,
    challenge   binary(16)                         not null,
    created_at  datetime default CURRENT_TIMESTAMP not null,
    description text                               null,
    constraint challenge_auth_uuid_uindex
        unique (uuid)
);

alter table challenge_auth
    add primary key (uuid);

create table challenge_auth_comment
(
    submitter      binary(16) not null,
    challenge_auth binary(16) not null,
    description    text       null
);

create index challenge_auth_comment_challenge_auth_index
    on challenge_auth_comment (challenge_auth);

create table mail_verification
(
    token     char(8)                            not null
        primary key,
    email     varchar(255)                       not null,
    issued_at datetime default CURRENT_TIMESTAMP not null,
    used      tinyint  default 0                 null
)
    charset = latin1;

create index mail_verification_email_index
    on mail_verification (email);

create table shopping_basket
(
    account   binary(16) not null,
    challenge binary(16) not null
);

create index shopping_basket_account_index
    on shopping_basket (account);

create table token
(
    token        binary(128)                        not null
        primary key,
    uuid         binary(16)                         not null,
    created_at   datetime default CURRENT_TIMESTAMP not null,
    expires_at   datetime                           not null,
    user_agent   varchar(255)                       not null,
    created_ip   binary(16)                         not null,
    last_seen_ip binary(16)                         not null
)
    charset = latin1;

create index token_uuid_created_at_index
    on token (uuid, created_at);

create index token_uuid_created_ip_index
    on token (uuid, created_ip);

create index token_uuid_expires_at_index
    on token (uuid, expires_at);

create index token_uuid_index
    on token (uuid);

create index token_uuid_last_seen_ip_index
    on token (uuid, last_seen_ip);
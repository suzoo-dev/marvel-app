create table characters (
	character_id primary key generated always as identity,
	character_age smallint not null,
	character_gender varchar(6) not null,
	character_status boolean not null
);

create table accomplices (
	character_id int references characters(character_id),
	accomplice_id int references characters(character_id),
	primary key (character_id, accomplice_id)
);

create table enemies (
	character_id int references characters(character_id),
	enemy_id int references characters(character_id),
	primary key (character_id, enemy_id)
);
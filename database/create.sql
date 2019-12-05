
create table eventeiros.item
(
    id serial,
    type text not null,
    description text not null
);

insert into eventeiros.item
    (type, description)
values
    ( 'prefix', 'Pedra');
insert into eventeiros.item
    (type, description)
values
    ( 'prefix', 'Papel');
insert into eventeiros.item
    (type, description)
values
    ( 'prefix', 'Tesoura');
insert into eventeiros.item
    (type, description)
values
    ( 'sufix', 'Cachorro');
insert into eventeiros.item
    (type, description)
values
    ( 'sufix', 'Kissaça');
insert into eventeiros.item
    (type, description)
values
    ( 'sufix', 'Limbo');
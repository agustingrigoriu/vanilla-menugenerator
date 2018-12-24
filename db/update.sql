/*
This file is to create the database.
*/

DO
$do$
begin

  if not exists(select 1 from information_schema.tables where table_schema='public' and table_name='menu') then
    raise notice '"menu" table does not exist, creating it.';
    create table menu(
      idmenu serial not null,
      menu varchar(20) unique not null,
      primary key(idmenu)
    );
  end if;

  if not exists(select 1 from information_schema.tables where table_schema='public' and table_name='menu_items') then
    raise notice '"menu_items" table does not exist, creating it.';
    create table menu_items(
      idmenuitem serial not null,
      title varchar(100),
      class varchar(100),
      url varchar(100),
      name varchar(100),
      primary key(idmenuitem)
    );
  end if;

  if not exists(select 1 from information_schema.tables where table_schema='public' and table_name='menu_detail') then
    raise notice '"menu_detail" table does not exist, creating it.';
    create table menu_detail(
      idmenudetail serial not null,
      menuorder integer not null,
      idparent integer null,
      idmenu integer references menu(idmenu),
      idmenuitem integer references menu_items(idmenuitem),
      primary key(idmenudetail)
    );
  end if;

end
$do$;


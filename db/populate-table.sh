CURRPATH=$(pwd)
echo $CURRPATH

psql -h 127.0.0.1 -U postgres -d imris -c "copy menu (idmenu, menu) from '$CURRPATH/csv_files/menu.csv' delimiter ',' CSV HEADER" 
psql -h 127.0.0.1 -U postgres -d imris -c "copy menu_items (idmenuitem, title, class, url, name) from '$CURRPATH/csv_files/menu_items.csv' delimiter ',' null as 'null' CSV HEADER" 
psql -h 127.0.0.1 -U postgres -d imris -c "copy menu_detail (idmenudetail, idmenu, menuorder, idparent, idmenuitem) from '$CURRPATH/csv_files/menu_detail.csv' delimiter ',' null as 'null' CSV HEADER" 


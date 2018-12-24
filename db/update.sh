#!/bin/bash

#Ctrl + C stops the whole script
trap "exit" INT

#If something fails, stop the script
set -e

echo "Deleting old database"
dropdb -h 127.0.0.1 -U postgres menugenerator
echo "Creating and updating new database"
createdb -h 127.0.0.1 -U postgres menugenerator
psql -h 127.0.0.1 -U postgres -d menugenerator < update.sql
./populate-table.sh

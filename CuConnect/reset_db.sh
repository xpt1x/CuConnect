rm -rf ./pims/migrations/*
touch ./pims/migrations/__init__.py
rm ./db.sqlite3
rm ./media/*
python manage.py makemigrations
python manage.py migrate
clear
python manage.py createsuperuser
clear
python manage.py runserver
#!/bin/bash

wait_for () {
    for _ in `seq 0 100`; do
        (echo > /dev/tcp/$1/$2) >/dev/null 2>&1
        if [[ $? -eq 0 ]]; then
            echo "$1:$2 accepts connections"
            break
        fi
        sleep 1
    done
}

case "$ENV" in
"DEV_DJANGO")
    wait_for "${DATABASE_HOST}" "${DATABASE_PORT}"
    python manage.py collectstatic --noinput &&
    python manage.py migrate &&
    python manage.py init_superuser &&
    python manage.py example_data &&
    python manage.py runserver 0.0.0.0:8000
    ;;
"PROD_DJANGO")
    wait_for "${DATABASE_HOST}" "${DATABASE_PORT}"
    python manage.py collectstatic --noinput &&
    python manage.py migrate &&
    python manage.py init_superuser &&
    gunicorn --config gunicorn_conf.py config.wsgi:application --log-level info
    ;;
esac

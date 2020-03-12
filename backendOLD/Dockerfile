FROM python:3.7-buster

WORKDIR /code

RUN apt-get update && apt-get install -y build-essential python3 python3-dev python3-pip

COPY . .

RUN pip3 install uwsgi && pip3 install -r requirements.txt

EXPOSE 8000

CMD ["uwsgi", "--ini", "uwsgi.ini"]
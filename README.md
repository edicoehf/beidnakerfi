# Beiðnakerfi - Edico ehf

Lokaverkefni gert af nemendum í Tölvunafræði við Háskólann í Reykjavík.

## Status

Backend:

![Heroku](https://pyheroku-badge-with-path.herokuapp.com/?app=beidnakerfi-api&path=/admin&style=flat)

Frontend:

![Heroku](https://pyheroku-badge-with-path.herokuapp.com/?app=beidnakerfi&style=flat)

## Uppsetning

Til þess að sækja forritið skal hlaða niður Github gagnahirslunni með efitrfarandi skipun:

`git clone git@github.com:edicoehf/beidnakerfi.git`

### Bakendi

Bakendinn keyrir á Python 3.7 með PostgreSQL gagnagrunni. Til þess að vera viss um að not andi sé með réttar útgáfur skal nota eftirfarandi skipanir:

```bash
➜  beidnakerfi git:(master) ✗ python3.7 --version
Python 3.7.2
➜  beidnakerfi git:(master) ✗ pip --version
pip 19.3.1 from /Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages/pip (python 3.7)
➜  beidnakerfi git:(master) ✗ psql --version
psql (PostgreSQL) 12.1
```

Til þess að keyra upp bakendann þarf fyrst að setja upp nauðsynlega pakka sem bakendinn notar:

```bash
➜  beidnakerfi git:(master) ✗ cd backend
➜  backend git:(master) ✗ pip install -r requirements.txt
Requirement already satisfied: asgiref==3.2.3 in /Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages (from -r requirements.txt (line 1)) (3.2.3)
Requirement already satisfied: astroid==2.3.3 in /Library/Frameworks/Python.framework/Versions/3.7/lib/python3.7/site-packages (from -r requirements.txt (line 2)) (2.3.3)
...
Installing collected packages: django-environ, djangorestframework, drf-nested-routers, python-dotenv, certifi, idna, chardet, requests
Successfully installed certifi-2020.4.5.1 chardet-3.0.4 django-environ-0.4.5 djangorestframework-3.11.0 drf-nested-routers-0.91 idna-2.9 python-dotenv-0.12.0 requests-2.23.0
```

Sem og búa til .env skjal í config/ möppunni sem þarf að innihalda eftirfarandi:

```config
DJANGO_SECRET_KEY='YOUR_DJANGO_SECRET_KEY'
DEBUG=True/False
DATABASE_URL='URL_TO_POSTGRES_DATABASE'
MAIL_SECRET_KEY='YOUR_MAILGUN_API_KEY'
MAIL_URL='YOUR_MAILGUN_MAILBOX_URL'
```

Eftir að allir nauðsynlegu pakkarnir hafa verið settir upp getum við loksins keyrt upp bakendann:

```bash
➜  backend git:(master) ✗ py manage.py runserver
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
April 30, 2020 - 17:25:20
Django version 3.0.3, using settings 'config.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### Framendi

Framendinn okkar keyrir á Node.JS server sem notast m.a við React, Material-UI og Axios pakkana til þess að tala við bakendann og birta gögnin frá honum á snirtilegann máta. 

Þar sem að við notuðumst við Node útgáfu `>= 13.0.0` mælum við eindregið með því að nota slíka þar sem við tryggjum ekki að virkni virki eins á eldri útgáfum.

Til að sjá hvaða útgáfu af Node og NPM þú ert með:

```bash
➜  frontend git:(master) ✗ node -v
v13.7.0
➜  frontend git:(master) ✗ npm -v
6.14.1
```

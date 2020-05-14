from django.conf import settings

# EMAIL API
import requests
import json


def send_email(email_recipient, title, body):
    server = settings.MAIL_URL
    auth = ("api", settings.MAIL_KEY)
    data = {
        "from": "Email Name <email@email.com>",
        "to": email_recipient,
        "subject": title,
        "text": body
    }

    return requests.post(server, auth=auth, data=data)

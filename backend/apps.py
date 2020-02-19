from django.apps import AppConfig
from django.contrib.auth.models import User
from django.db.models import signals
from tastypie.models import create_api_key


class BackendConfig(AppConfig):
    name = 'backend'

    def ready(self):
        signals.post_save.connect(create_api_key, sender=User)
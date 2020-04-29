# https://medium.com/@yerkebulan199/django-rest-framework-drf-token-authentication-with-expires-in-a05c1d2b7e05

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

from datetime import timedelta
from django.utils import timezone
from django.conf import settings

def expire_time(token):
    time_elapsed = timezone.now() - token.created
    timer = timedelta(seconds = settings.TOKEN_EXPIRY_TIME) - time_elapsed

    return timer

def is_token_expired(token):
    return expire_time(token) < timedelta(seconds = 0)

def token_login_handler(token):
    token.delete()
    token = Token.objects.create(user = token.user)
    return token

def token_expire_handler(token):
    is_expired = is_token_expired(token)
    if is_expired:
        token.delete()
        token = Token.objects.create(user = token.user)
    return is_expired, token

class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        try:
            token = Token.objects.get(key = key)
        except Token.DoesNotExist:
            raise AuthenticationFailed("Invalid token")

        if not token.user.is_active:
            raise AuthenticationFailed("User disabled")

        is_expired, token = token_expire_handler(token)

        if is_expired:
            raise AuthenticationFailed("This token has expired")

        return (token.user, token)
import random
import string
from django.conf import settings

from .models import Cheque


def generator(size=settings.CODE_LENGTH, chars=string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


def unique_code():
    code = generator()

    if Cheque.objects.filter(code=code).exists():
        return unique_code()
    return code

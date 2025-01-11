from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
import jwt

class JWTAuthenticationBackend(BaseBackend):
    def authenticate(self, request, token=None):
        if token is None:
            return None

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            user = User.objects.get(id=payload['id'])
            return user
        except jwt.ExpiredSignatureError:
            return None
        except jwt.DecodeError:
            return None
        except User.DoesNotExist:
            return None

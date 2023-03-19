import os
from datetime import timedelta

BASE_DIR = os.path.dirname(__file__)
SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, '42pub.db'))
PERMANENT_SESSION_LIFETIME = timedelta(minutes=10)
CACHE_EXPIRATION_TIME = timedelta(hours=1)
SQLALCHEMY_TRACK_MODIFICATIONS = False
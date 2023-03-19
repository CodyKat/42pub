import os
from datetime import timedelta

BASE_DIR = os.path.dirname(__file__)
SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, '42pub.db'))
PERMANENT_SESSION_LIFETIME = timedelta(seconds=10)
SQLALCHEMY_TRACK_MODIFICATIONS = False
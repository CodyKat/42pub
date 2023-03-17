from flask import Blueprint, jsonify
from functions.utils import genRandomUsername
from functions.DBcontrol import database

bp = Blueprint('api_get_random_username', __name__, url_prefix='api')

from pub.models import Users


@bp.route('/get_random_username')
def get_random_username():
    random_username = genRandomUsername.generate_user_id()
    UserDBInfo = Users.Info(name=random_username)
    database.upload(UserDBInfo)
    return jsonify([{'username': f'{random_username}'}])
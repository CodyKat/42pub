from flask import Blueprint, jsonify
from ..functions.utils import genRandomUsername
from ..functions.DBcontrol import database

bp = Blueprint('api_get_random_username', __name__, url_prefix='/api')

from pub.models import UserInfo
from pub import db

@bp.route('/get_random_username', methods=['POST'])
def get_random_username():
    random_username = genRandomUsername.generate_user_id()
    UserDBInfo = UserInfo(UserName=random_username)
    database.upload(UserDBInfo)
    return jsonify({'user_name': f'{random_username}'})
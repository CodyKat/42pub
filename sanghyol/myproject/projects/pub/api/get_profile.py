from flask import Blueprint, jsonify, session
from flask_login import current_user

bp = Blueprint('api_get_profile', __name__, url_prefix='/api')


from pub import db
from pub.models import Users
from functions.utils import changeType

@bp.route('/get_profile', methods=['POST'])
def get_profile():
    user_name = session.get('user_name')
    user_info = Users.info.query.get_or_404(user_name=user_name)
    user_info_dict = {
        'id': user_info.id,
        'user_id': user_info.user_id,
        'wallet': user_info.wallet,
        'eval_point': user_info.wallet,
        'money': user_info.money,
        'level': user_info.level,
        'exp': user_info.exp
    }
    return jsonify(user_info_dict)

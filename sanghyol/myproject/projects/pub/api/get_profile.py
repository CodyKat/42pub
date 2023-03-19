from flask import Blueprint, jsonify, session
from flask_login import current_user

bp = Blueprint('api_get_profile', __name__, url_prefix='/api')


from pub import db
from pub.models import UserInfo

@bp.route('/get_profile', methods=['POST'])
def get_profile():
    user_name = session.get('user_name')
    user_info = UserInfo.query.get_or_404(UserName=user_name)
    user_info_dict = {
        'id': user_info.id,
        'username': user_info.UserName,
        'wallet': user_info.Wallet,
        'eval_point': user_info.EvalPoint,
        'money': user_info.Money,
        'level': user_info.Level,
        'exp': user_info.EXP
    }
    return jsonify(user_info_dict)

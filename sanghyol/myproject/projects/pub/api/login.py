from flask import Blueprint, jsonify, request, session
from flask_login import login_user
from functions.DBcontrol import database

bp = Blueprint('login', __name__, url_prefix='api')

from pub.models import Users


@bp.route('/login', methods=('GET', 'POST'))
def login():
    return_data = {
        'status': False,
        'message': None
    }
    #data를 username이란 value로 받는다고 가정.
    if request.method == 'POST':
        user = Users.Info.query.filter_by(name=request.form['username']).first()
        if not user:
            return_data['message'] = "존재하지 않는 사용자입니다."
        else:
            login_user(user)
            return_data['status'] = True
            return_data['message'] = f"{user.name}님 환영합니다!"
        return jsonify([return_data])

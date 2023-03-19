from flask import Blueprint, jsonify, request, session, g, redirect, url_for
bp = Blueprint('login', __name__, url_prefix='/api')

from pub.models import UserInfo

@bp.route('/login', methods=['GET', 'POST'])
def login():
    return_data = {
        'status': False,
    }
    #data를 username이란 value로 받는다고 가정.
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        user = UserInfo.query.filter_by(UserName=username).first()
        if user:
            session.clear()
            session['user_name'] = user.UserName
            return_data['status'] = True
        return jsonify(return_data)
    
@bp.route('/logout')
def logout():
    session.pop('user_name', None)

@bp.route('/is_login', methods=['POST'])
def is_login():
    user_session = request.cookies.get('user_name')
    status = {
        'status': 200
    }
    if not user_session or user_session != session.get('user_name'):
        status['status'] = 401
    return jsonify(status), status['status']
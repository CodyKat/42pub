from flask import Blueprint, jsonify, request, session
from flask_login import login_user

bp = Blueprint('login', __name__, url_prefix='/api')

from pub.models import Users


@bp.route('/login', methods=('GET', 'POST'))
def login():
    return_data = {
        'status': False,
    }
    #data를 username이란 value로 받는다고 가정.
    if request.method == 'POST':
        user = Users.Info.query.filter_by(name=request.form['username']).first()
        if user:
            login_user(user)
            return_data['status'] = True
        return jsonify([return_data])

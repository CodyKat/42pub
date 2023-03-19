from flask import Blueprint, url_for, render_template, session, request
from werkzeug.utils import redirect


bp = Blueprint('main', __name__, url_prefix='/')

@bp.route('/index')
def index():
    user_session = session.get('user_name')
    if user_session:
        print('user_session_ok')
        return render_template('Main/freepass_index.html')
    else:
        print('user_session_fail')
        return render_template('Main/index.html')

@bp.route('/')
def return_index():
    return redirect(url_for('main.index'))

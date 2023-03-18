from flask import Blueprint, url_for, render_template, session, request
from werkzeug.utils import redirect

from pub.models import Users


bp = Blueprint('main', __name__, url_prefix='/')
@bp.route('/index')
def index():
    user_session = session.get('user_name')
    print(user_session)
    return render_template('Main/index.html')

@bp.route('/')
def return_index():
    return redirect(url_for('main.index'))

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_name')
    if user_id is None and request.endpoint != 'main.index':
        redirect(url_for('main.index'))
        
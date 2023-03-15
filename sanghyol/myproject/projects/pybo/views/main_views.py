from flask import Blueprint, url_for
from werkzeug.utils import redirect

from pybo.models import Users, Market

bp = Blueprint('main', __name__, url_prefix='/')
@bp.route('/hello')
def hello():
    return 'hello'

@bp.route('/')
def index():
    return redirect(url_for('market._item_list'))
